import { useEffect, useState } from "react";

export function PreviewModal({ note, onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [handleClose]);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setDownloadComplete(true);

          setTimeout(() => {
            setDownloadComplete(false);
            handleClose();
          }, 2000);

          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-4xl glassmorphism rounded-2xl overflow-hidden transition-all duration-500 ${
          isOpen ? "scale-100 rotate-0" : "scale-90 rotate-3"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 bg-red-600/20 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all z-20"
        >
          ✕
        </button>

        {downloadComplete ? (
          <div className="p-12 text-center animate-reveal">
            <div className="text-6xl mb-6 animate-bounce">✓</div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Download Complete!
            </h3>
            <p className="text-gray-400">Your notes are ready to use</p>
          </div>
        ) : (
          <>
            {/* Book Preview */}
            <div className="relative h-96 bg-gradient-to-br from-gray-900 to-black p-12 flex items-center justify-center">
              <div className="relative perspective-1000">
                <div
                  className="w-64 h-80 bg-white/10 rounded-lg shadow-2xl"
                  style={{
                    transform: "rotateY(-5deg) rotateX(5deg)",
                    boxShadow: "20px 20px 60px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="p-6 h-full flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {note.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{note.subject}</p>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-6xl opacity-20">📖</div>
                    </div>
                    <div className="text-gray-500 text-xs text-center">
                      {note.pages} pages
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                {note.title}
              </h2>
              <p className="text-gray-400 mb-6">{note.subject}</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="glassmorphism p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">📄</div>
                  <div className="text-sm text-gray-400">Pages</div>
                  <div className="text-lg font-bold text-white">
                    {note.pages}
                  </div>
                </div>

                <div className="glassmorphism p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">⬇️</div>
                  <div className="text-sm text-gray-400">Downloads</div>
                  <div className="text-lg font-bold text-white">
                    {note.downloads}
                  </div>
                </div>

                <div className="glassmorphism p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">📂</div>
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-lg font-bold text-white">
                    {note.category}
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-semibold transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] disabled:opacity-50 relative overflow-hidden"
              >
                {isDownloading ? (
                  <>
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Downloading... {downloadProgress}%
                    </div>

                    <div
                      className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-300"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </>
                ) : (
                  "⬇️ Download Notes"
                )}
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                Press ESC to close • Click outside to dismiss
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
