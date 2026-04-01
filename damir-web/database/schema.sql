-- ============================================================
-- DAMIR Store · Supabase PostgreSQL Schema
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PRODUCTS
-- ============================================================
create table if not exists products (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  description text not null,
  price       numeric(10,2) not null check (price >= 0),
  category    text not null check (category in ('ropa','calzado','muebles','accesorios','restaurante')),
  stock       integer not null default 0 check (stock >= 0),
  images      text[] default '{}',
  sizes       text[] default null,
  colors      text[] default null,
  featured    boolean default false,
  active      boolean default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Index for catalog queries
create index idx_products_category on products(category) where active = true;
create index idx_products_featured on products(featured) where active = true and featured = true;
create index idx_products_stock on products(stock);

-- Full text search
create index idx_products_fts on products using gin(
  to_tsvector('spanish', name || ' ' || description)
);

-- ============================================================
-- ORDERS
-- ============================================================
create table if not exists orders (
  id              uuid primary key default uuid_generate_v4(),
  order_number    text not null unique,
  customer_name   text not null,
  customer_phone  text not null,
  customer_email  text,
  items           jsonb not null,
  total           numeric(10,2) not null check (total >= 0),
  status          text not null default 'pendiente'
                    check (status in ('pendiente','confirmado','preparando','listo','entregado','cancelado')),
  pickup_date     date not null,
  pickup_time     text not null,
  notes           text,
  whatsapp_sent   boolean default false,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index idx_orders_status on orders(status);
create index idx_orders_pickup_date on orders(pickup_date);
create index idx_orders_created_at on orders(created_at desc);

-- ============================================================
-- PICKUP SLOTS (optional advanced scheduling)
-- ============================================================
create table if not exists pickup_slots (
  id             uuid primary key default uuid_generate_v4(),
  date           date not null,
  time           text not null,
  max_orders     integer not null default 3,
  current_orders integer not null default 0,
  active         boolean default true,
  created_at     timestamptz default now(),
  unique(date, time)
);

create index idx_pickup_slots_date on pickup_slots(date) where active = true;

-- ============================================================
-- FUNCTION: Decrement stock safely
-- ============================================================
create or replace function decrement_stock(product_id uuid, amount integer)
returns void
language plpgsql
as $$
begin
  update products
  set
    stock = greatest(0, stock - amount),
    updated_at = now()
  where id = product_id;
end;
$$;

-- ============================================================
-- FUNCTION: Auto-update updated_at
-- ============================================================
create or replace function update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at
  before update on products
  for each row execute function update_updated_at();

create trigger orders_updated_at
  before update on orders
  for each row execute function update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table products enable row level security;
alter table orders enable row level security;

-- Products: anyone can read active products
create policy "Public can view active products"
  on products for select
  using (active = true);

-- Products: only service role can insert/update/delete
create policy "Service role manages products"
  on products for all
  using (auth.role() = 'service_role');

-- Orders: only service role can read all orders
create policy "Service role manages orders"
  on orders for all
  using (auth.role() = 'service_role');

-- Orders: anyone can insert (create order)
create policy "Anyone can create orders"
  on orders for insert
  with check (true);

-- ============================================================
-- SAMPLE DATA
-- ============================================================
insert into products (name, description, price, category, stock, featured) values
  ('Camisa Linen Premium',     'Camisa de lino de alta calidad, perfecta para cualquier ocasión.',     450,  'ropa',       12, true),
  ('Pantalón Chino Slim',      'Pantalón chino de corte slim fit, cómodo y elegante.',                 520,  'ropa',        8, true),
  ('Bota Vaquera Artesanal',   'Bota vaquera hecha a mano con piel genuina.',                          1850, 'calzado',     5, true),
  ('Tenis Casual Urban',       'Tenis cómodos para el día a día con diseño moderno.',                   780,  'calzado',     2, false),
  ('Sillón Rústico Nogal',     'Sillón de madera de nogal con tapizado en piel vegana.',               4200, 'muebles',     3, true),
  ('Mesa Centro Industrial',   'Mesa de centro con estructura de hierro y madera de pino.',            2900, 'muebles',     4, true),
  ('Bolsa Piel Artesanal',     'Bolsa de mano en piel genuina con detalles a mano.',                   1200, 'accesorios',  6, true),
  ('Cinturón Trenzado',        'Cinturón trenzado hecho a mano en piel genuina.',                       380,  'accesorios',  0, false);
