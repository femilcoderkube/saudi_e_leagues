import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import dummyPdf from "../../assets/newpdf.pdf";
import { baseURL } from "../../utils/axios";
import { useSelector } from "react-redux";
import { getServerURL } from "../../utils/constant";
import { useTranslation } from "react-i18next";

// Set the workerSrc to match react-pdf's PDF.js version
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;

function PdfModal({ onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pageWidth, setPageWidth] = useState(null);
  const containerRef = useRef(null);
  const { leagueData } = useSelector((state) => state.leagues);
  const { t } = useTranslation();
  // Trigger animation on mount
  useEffect(() => {
    setIsOpen(true);
    return () => setIsOpen(false); // Cleanup on unmount
  }, []);

  // Set page width to fit container (prevent horizontal scroll)
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        // Subtract some padding for the container
        const maxWidth = containerRef.current.offsetWidth - 70; // 32px for px-2 and border
        setPageWidth(maxWidth > 0 ? maxWidth : 0);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error) => {
    console.error("PDF loading error:", error);
  };

  // Custom style to hide scrollbars (cross-browser)
  const hideScrollbarStyle = {
    overflowX: "hidden",
    overflowY: "auto",
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE 10+
  };

  // For Webkit browsers (Chrome, Safari, Edge)
  // We'll use a style tag for ::-webkit-scrollbar
  // This will be injected only once
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .pdf-scroll-hide::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        background: transparent !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-transparent bg-opacity-60 flex items-center justify-center z-[999] m-4 md:m-0 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className={`match_reg2--popup rounded-2xl p-6 w-full max-w-4xl max-h-[95vh] relative overflow-hidden shadow-2xl transform transition-all scroll-hide duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - Fixed position */}
        <button
          onClick={onClose}
          className="fixed top-3 right-4 text-gray-300 hover:text-white transform hover:rotate-90 hover:scale-110 transition-all duration-200 z-10"
          aria-label="Close modal"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* PDF Viewer */}
        <div
          className="flex flex-col mt-3 items-center max-h-[calc(95vh-8rem)] px-2 w-full pdf-scroll-hide"
          ref={containerRef}
          style={hideScrollbarStyle}
        >
          <Document
            file={getServerURL(leagueData?.rules)}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            className="w-full rounded-lg scroll-hide"
            loading={
              <div className="text-white text-lg animate-pulse">
                {t("common.loading_pdf")}
              </div>
            }
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                width={pageWidth || undefined}
                className="m-4 scroll-hide bg-transparent"
                
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}

export default PdfModal;
