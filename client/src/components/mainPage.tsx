import { useTranslation } from 'react-i18next';

export default function MainPage() {
    const { t } = useTranslation();
    return (
        <div>
            <h1>{t('home.main_page')}</h1>
        </div>
    );
}
