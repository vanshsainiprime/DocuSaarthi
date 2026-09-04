import './PdfThumbnail.css'
import { useEffect, useRef } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

type PdfThumbnailProps = {
  file: File
}

function PdfThumbnail({ file }: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let cancelled = false

    async function renderFirstPage() {
      try {
        const arrayBuffer = await file.arrayBuffer()

        const pdf = await pdfjsLib.getDocument({
          data: arrayBuffer,
        }).promise

        if (cancelled) {
          return
        }

        const page = await pdf.getPage(1)

        if (cancelled) {
          return
        }

        const canvas = canvasRef.current

        if (!canvas) {
          return
        }

        const context = canvas.getContext('2d')

        if (!context) {
          return
        }

        const baseViewport = page.getViewport({
          scale: 1,
        })

        const targetWidth = 150
        const scale =
          targetWidth / baseViewport.width

        const viewport = page.getViewport({
          scale,
        })

        const devicePixelRatio =
          window.devicePixelRatio || 1

        canvas.width =
          viewport.width * devicePixelRatio

        canvas.height =
          viewport.height * devicePixelRatio

        canvas.style.width =
          `${viewport.width}px`

        canvas.style.height =
          `${viewport.height}px`

        context.setTransform(
          devicePixelRatio,
          0,
          0,
          devicePixelRatio,
          0,
          0,
        )

        
        await page.render({
          canvas,
          canvasContext: context,
          viewport,
        }).promise

        if (cancelled) {
          return
        }
      } catch (error) {
        console.error(
          'Could not render PDF thumbnail:',
          error,
        )
      }
    }

    renderFirstPage()

    return () => {
      cancelled = true
    }
  }, [file])

  return (
    <div className="pdf-thumbnail">
      <canvas ref={canvasRef} />
      <span className="pdf-thumbnail-label">
        PDF
      </span>
    </div>
  )
}

export default PdfThumbnail
