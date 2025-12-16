import { useEffect, useRef, useState } from "react"

export function PDFPreview({ pdfUrl, className = "" }) {
  const canvasRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    const loadPDF = async () => {
      try {
        setLoading(true)
        setError(false)

        // Dynamically import PDF.js
        const pdfjsLib = await import("pdfjs-dist")

        // Set worker source
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

        const loadingTask = pdfjsLib.getDocument(pdfUrl)
        const pdf = await loadingTask.promise

        const page = await pdf.getPage(1)

        const canvas = canvasRef.current
        if (!canvas || cancelled) return

        const context = canvas.getContext("2d")
        if (!context) return

        const viewport = page.getViewport({ scale: 1 })
        const scale = Math.min(300 / viewport.width, 200 / viewport.height)
        const scaledViewport = page.getViewport({ scale })

        canvas.width = scaledViewport.width
        canvas.height = scaledViewport.height

        await page.render({
          canvasContext: context,
          viewport: scaledViewport,
        }).promise

        if (!cancelled) setLoading(false)
      } catch (err) {
        console.error("Error loading PDF:", err)
        if (!cancelled) {
          setError(true)
          setLoading(false)
        }
      }
    }

    loadPDF()

    return () => {
      cancelled = true
    }
  }, [pdfUrl])

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-900/50 rounded-lg ${className}`}
      >
        <div className="text-center p-6">
          <div className="text-4xl mb-2">📄</div>
          <p className="text-gray-500 text-sm">Preview unavailable</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-500" />
        </div>
      )}

      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover rounded-lg transition-opacity ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  )
}
