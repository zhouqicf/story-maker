import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = '确定',
  cancelText = '取消',
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 space-y-4"
            >
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="text-red-500" size={32} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bubble text-center text-candy-text">
                {title}
              </h3>

              {/* Message */}
              <p className="text-gray-600 text-center font-body">
                {message}
              </p>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={onCancel}
                  className="flex-1 px-6 py-3 rounded-2xl font-bubble text-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all active:scale-95 shadow-sm"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 px-6 py-3 rounded-2xl font-bubble text-lg bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all active:scale-95 shadow-lg shadow-red-500/30"
                >
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
