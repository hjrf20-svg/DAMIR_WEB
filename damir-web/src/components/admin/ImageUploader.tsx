'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, ImagePlus, Loader2, GripVertical, Star } from 'lucide-react'
import toast from 'react-hot-toast'

interface Props {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
}

export default function ImageUploader({ images, onChange, maxImages = 6 }: Props) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

    if (!cloudName || cloudName === 'YOUR_CLOUD_NAME') {
      // Fallback: create a local object URL for preview when Cloudinary isn't set up
      return URL.createObjectURL(file)
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'damir_products') // Set this in Cloudinary dashboard
    formData.append('folder', 'damir/products')

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: formData }
    )

    if (!res.ok) throw new Error('Error al subir imagen')
    const data = await res.json()
    return data.secure_url
  }

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const remaining = maxImages - images.length
    if (remaining <= 0) {
      toast.error(`Máximo ${maxImages} imágenes por producto`)
      return
    }

    const filesToUpload = Array.from(files).slice(0, remaining)
    const invalidFiles = filesToUpload.filter(f => !f.type.startsWith('image/'))
    if (invalidFiles.length > 0) {
      toast.error('Solo se permiten archivos de imagen (JPG, PNG, WEBP)')
      return
    }

    setUploading(true)
    const uploadToast = toast.loading(`Subiendo ${filesToUpload.length} imagen(es)...`)

    try {
      const urls = await Promise.all(filesToUpload.map(uploadToCloudinary))
      onChange([...images, ...urls])
      toast.success(`${urls.length} imagen(es) subida(s)`, { id: uploadToast })
    } catch (err) {
      toast.error('Error al subir imágenes. Intenta de nuevo.', { id: uploadToast })
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  const setAsMain = (index: number) => {
    if (index === 0) return
    const newImages = [...images]
    const [img] = newImages.splice(index, 1)
    newImages.unshift(img)
    onChange(newImages)
    toast.success('Imagen principal actualizada')
  }

  return (
    <div className="space-y-3">
      {/* Upload zone */}
      {images.length < maxImages && (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
            dragOver
              ? 'border-damir-500 bg-damir-50 scale-[1.01]'
              : 'border-gray-200 hover:border-damir-400 hover:bg-gray-50'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            handleFiles(e.dataTransfer.files)
          }}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-3 text-damir-600">
              <Loader2 size={36} className="animate-spin" />
              <p className="font-semibold">Subiendo imágenes...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-damir-100 rounded-full flex items-center justify-center">
                <ImagePlus size={26} className="text-damir-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-base">
                  Arrastra fotos aquí o <span className="text-damir-700 underline">elige archivos</span>
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  JPG, PNG, WEBP · Máx. {maxImages} fotos · La primera será la foto principal
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Upload size={12} />
                <span>Se suben directo a Cloudinary · Alta calidad · Sin límite de tamaño</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Image grid */}
      {images.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
            <Star size={14} className="text-yellow-500" />
            La primera imagen es la foto principal del producto
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {images.map((img, i) => (
              <div key={img} className="relative group aspect-square">
                <div className={`relative w-full h-full rounded-xl overflow-hidden border-2 transition-all ${
                  i === 0 ? 'border-damir-500 shadow-md' : 'border-gray-200'
                }`}>
                  <Image
                    src={img}
                    alt={`Foto ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                  {/* Main badge */}
                  {i === 0 && (
                    <div className="absolute top-1 left-1 bg-damir-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      PRINCIPAL
                    </div>
                  )}
                </div>

                {/* Hover actions */}
                <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                  {i !== 0 && (
                    <button
                      type="button"
                      onClick={() => setAsMain(i)}
                      title="Hacer principal"
                      className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-yellow-50 transition-colors"
                    >
                      <Star size={13} className="text-yellow-600" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    title="Eliminar"
                    className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
                  >
                    <X size={13} className="text-red-600" />
                  </button>
                </div>
              </div>
            ))}

            {/* Add more slot */}
            {images.length < maxImages && !uploading && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-damir-400 hover:bg-damir-50 transition-all text-gray-400 hover:text-damir-600"
              >
                <ImagePlus size={20} />
                <span className="text-[10px] font-medium">Agregar</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Cloudinary configured — no warning needed */}
    </div>
  )
}
