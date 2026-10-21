"use client"

import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/hooks/use-translation"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()
  const { t } = useTranslation('common')

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      {/* QA 07/10 19:36: aria-label della toast region localizzato (it/en/fr/de)
          invece del default inglese "Notifications (F8)" di Radix — gli
          screen reader leggono la regione nella lingua attiva del sito. */}
      <ToastViewport aria-label={t('dialog.notificationsRegion')} />
    </ToastProvider>
  )
}
