import '../../styles.css';
import React from 'react';
import { formatPrice } from '../../../utils/currency';
import { ModalBasketI } from './interface';
import PlusIcon from '../../../assets/icons/plus-small.png';
import MinusIcon from '../../../assets/icons/minus-small.png';
import CloseIcon from '../../../assets/icons/close.png';
import { translate } from '../../../utils/locales/i18n';

const ModalBasket: React.FC<ModalBasketI> = ({ calculateTotal, locale, currency, updatedQuantity, productCounter, updatedItems, handleMinus, handlePlus, onClose, selectedModifier }) => {
    return (
        <>
            <div className="container-modal">
                <div className="modal-content">
                    <div className="subcontainer-basket" aria-label="Shopping cart">
                        <div className="subcontainer-basket-1 bp-white">
                            <h2 className="text-center title-basket">{translate('Basket')}</h2>
                            <button className="modal-close-basket basket" onClick={onClose}>
                                <img src={CloseIcon} alt="" />
                            </button>
                        </div>
                        <div className="subcontainer-basket-2">
                            {updatedQuantity > 0 ? (
                                updatedItems.map((basket, index) => (
                                    productCounter[index] > 0 && (
                                        <div key={index}>
                                            <div className="subcontainer-basket-2-1">
                                                <div className="container-name-counter">
                                                    <p className="title-basket-name">{basket.item.name}</p>
                                                    {basket.item.modifiers &&
                                                        basket.item.modifiers.map((modifier) =>
                                                            modifier.items
                                                                .filter((modifierItem) =>
                                                                    selectedModifier.some((mod) => mod.id === modifierItem.id)
                                                                )
                                                                .map((modifierItem) => {
                                                                    const selectedModifierUnit = selectedModifier.find(
                                                                        (mod) => mod.id === modifierItem.id
                                                                    );

                                                                    if (selectedModifierUnit) {
                                                                        basket.item.price = selectedModifierUnit.price;
                                                                    }

                                                                    return (
                                                                        <div key={modifierItem.id}>
                                                                            <p className="modifier-name">
                                                                                {selectedModifierUnit && translate(selectedModifierUnit.name) + ` (+${formatPrice(basket.item.price, locale, currency)})`}
                                                                            </p>
                                                                        </div>
                                                                    );
                                                                })
                                                        )}
                                                    <div className="subcontainer-basket-2-2">
                                                        <button
                                                            className="btn-minus-basket"
                                                            onClick={() => handleMinus(index)}
                                                            aria-label={`Decrease quantity of ${basket.item.name}`}
                                                        >
                                                            <img src={MinusIcon} alt="Decrease quantity" />
                                                        </button>
                                                        <p className="p-counter-order">
                                                            {productCounter[index] > 0 ? productCounter[index] : basket.quantity}
                                                        </p>
                                                        <button
                                                            className="btn-plus-basket"
                                                            onClick={() => handlePlus(index)}
                                                            aria-label={`Increase quantity of ${basket.item.name}`}
                                                        >
                                                            <img src={PlusIcon} alt="Increase quantity" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="title-basket-price">
                                                    {formatPrice((basket.price ? basket.price : basket.item.price) * (productCounter[index] > 0 ? productCounter[index] : basket.quantity), locale, currency)}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                ))
                            ) : (
                                <p className="subtitle-basket">Seu Basket está vazio</p>
                            )}
                        </div>

                        {updatedQuantity > 0 && (
                            <>
                                <div className="subcontainer-basket-1-2">
                                    <div className="subcontainer-basket-2-1-1 border-2-1-1">
                                        <p className="title-total-basket subtotal-b">Sub-total:</p>
                                        <p className="title-total-basket price subtotal-price">{formatPrice(calculateTotal(), locale, currency)}</p>
                                    </div>
                                    <div className="subcontainer-basket-2-1-1">
                                        <p className="title-total-basket">Total:</p>
                                        <p className="title-total-basket price">{formatPrice(calculateTotal(), locale, currency)}</p>
                                    </div>
                                </div>
                                <div style={{ height: '48px' }}>
                                    <button className="btn-add-order checkout">{translate('Checkout now')}</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalBasket;