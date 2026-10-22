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
      {/* QA 22/10 02:36 (miglioria ciclo, fix del QA 07/10 19:36): la prop
          corretta per localizzare l'annuncio della regione è `label` (prop
          documentata di Radix ToastViewport: "An author-localized label... The
          available `{hotkey}` placeholder will be replaced for you"), NON
          `aria-label`. Verificato in node_modules/@radix-ui/react-toast: il
          wrapper esterno <div role="region"> riceve
          aria-label={label.replace("{hotkey}", hotkeyLabel)}, mentre un
          `aria-label` passato finisce nello spread ...viewportProps
          sull'<ol> interno — la regione veniva annunciata dagli screen reader
          come "Notifications (F8)" in inglese e l'italiano "Notifiche (F8)"
          restava solo sull'ol. Ora la regione annuncia "Notifiche (F8)".
          La stringa esistente non ha il placeholder {hotkey}: Radix la
          lascia invariata (stesso output di prima, zero cambi visivi). */}
      <ToastViewport label={t('dialog.notificationsRegion')} />
    </ToastProvider>
  )
}
