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
                        {product.piece_info?.dimensions.width} x{' '}
                        {product.piece_info?.dimensions.height} x{' '}
                        {product.piece_info?.dimensions.depth}{' '}
                        {product.piece_info?.dimensions.measure}
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {t('product.weight')}: {product.piece_info?.weight}
                        {'kg'}
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {t('product.materials')} {product.piece_info?.material}
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
            {/*<AccordionPanel>
                <AccordionTitle>Entregas e Devoluções</AccordionTitle>
                <AccordionContent>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        The main difference is that the core components from
                        Flowbite are open source under the MIT license, whereas
                        Tailwind UI is a paid product. Another difference is
                        that Flowbite relies on smaller and standalone
                        components, whereas Tailwind UI offers sections of
                        pages.
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        However, we actually recommend using both Flowbite,
                        Flowbite Pro, and even Tailwind UI as there is no
                        technical reason stopping you from using the best of two
                        worlds.
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        Learn more about these technologies:
                    </p>
                    <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                        <li>
                            <a
                                href="https://flowbite.com/pro/"
                                className="text-cyan-600 hover:underline dark:text-cyan-500">
                                Flowbite Pro
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://tailwindui.com/"
                                rel="nofollow"
                                className="text-cyan-600 hover:underline dark:text-cyan-500">
                                Tailwind UI
                            </a>
                        </li>
                    </ul>
                </AccordionContent>
    </AccordionPanel>*/}
        </Accordion>
    );
};

export default ProductAccordion;
