import Swal from 'sweetalert2';
import { AuthTranslations } from '../translations/auth-translations';

export const showAuthAlert = (lang: string, onSignIn: () => void) => {
    const t = AuthTranslations[lang];
    const isRtl = lang === 'ar';

    Swal.fire({
        title: `<span style="font-family: inherit; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em;">${t.authRequired}</span>`,
        text: t.authRequiredDesc,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: t.signIn,
        cancelButtonText: isRtl ? 'إلغاء' : 'Cancel',
        confirmButtonColor: '#FF5656',
        cancelButtonColor: 'transparent',
        customClass: {
            popup: 'rounded-[2.5rem] border border-border bg-surface text-foreground',
            confirmButton: 'rounded-2xl px-8 py-3 font-black uppercase tracking-widest text-sm',
            cancelButton: 'rounded-2xl px-8 py-3 font-bold text-muted text-sm',
        },
        buttonsStyling: true,
        reverseButtons: isRtl
    }).then((result) => {
        if (result.isConfirmed) {
            onSignIn();
        }
    });
};
