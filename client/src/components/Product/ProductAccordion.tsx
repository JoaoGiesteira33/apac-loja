import {
    Accordion,
    AccordionContent,
    AccordionPanel,
    AccordionTitle,
} from 'flowbite-react';
import { ProductType } from '../../types/product';
import { useTranslation } from 'react-i18next';

const ProductAccordion = (data: { product: ProductType }) => {
    const { t } = useTranslation();
    const product = data.product;

    return (
        <Accordion collapseAll className="font-poppins">
            <AccordionPanel>
                <AccordionTitle>{t('product.product-details')}</AccordionTitle>
                <AccordionContent>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {t('product.technique')}:{' '}
                        {product.piece_info?.technique}
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {t('product.dimensions')}
                        {': '}
                        {product.piece_info?.dimensions && (
                            <>
                                {product.piece_info?.dimensions.width} x{' '}
                                {product.piece_info?.dimensions.height} x{' '}
                                {product.piece_info?.dimensions.depth}{' '}
                            </>
                        )}
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {t('product.weight')}:{' '}
                        {product.piece_info?.dimensions?.weight}
                        {product.piece_info?.dimensions && <>{'kg'}</>}
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {t('product.materials')} {product.piece_info?.materials}
                    </p>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel>
                <AccordionTitle>{t('global.description')}</AccordionTitle>
                <AccordionContent>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {product.description}
                    </p>
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    );
};

export default ProductAccordion;
