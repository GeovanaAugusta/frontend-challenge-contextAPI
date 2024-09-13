import React, { useEffect, useState } from 'react';
import '../../styles.css';
import { ModalI } from './interface';
import CloseIcon from '../../../assets/icons/close.png';
import PlusIcon from '../../../assets/icons/plus.png';
import MinusIcon from '../../../assets/icons/minus.png';
import { INITIAL_STATE } from './constants';
import { ItemMod, Items } from '../../../Interfaces/MenuI';
import { formatPrice } from '../../../utils/currency';
import { translate } from '../../../utils/locales/i18n';

const ModalProductDetails: React.FC<ModalI> = ({ item, onClose, onProductCounter, locale, currency, onOpen, selectedItemObject, selectedModifier, itemPrice, updatedItems }) => {
  const [state, setState] = useState({
    ...INITIAL_STATE,
    productCounter: selectedItemObject[item.name] || 0,
    selectedModifier: selectedModifier ? selectedModifier : [] as ItemMod[],
    itemPrice: itemPrice ? itemPrice : item.price
  });

  useEffect(() => {
    const currentItem = updatedItems.find(updatedItem => updatedItem.item.name === item.name);
    if (currentItem) {
      if (currentItem.quantity === 0 && currentItem.item.modifiers) {
        setState(prevState => ({
          ...prevState,
          selectedModifier: [],
          itemPrice: 0,
          isDisabledBtn: true
        }));
      }
    }
  }, [updatedItems, item.name]);

  if (!item) return null;

  const handleQuantityUpdate = (item: Items, counter: number, isModifier: boolean, selectedModifier: ItemMod[], itemPrice: number) => {
    onProductCounter(item, counter, isModifier, selectedModifier, itemPrice);
  };

  const handlePlus = () => {
    setState((prev) => ({
      ...prev,
      productCounter: state.productCounter + 1
    }))
  }

  const handleMinus = () => {
    setState((prev) => ({
      ...prev,
      productCounter: prev.productCounter > 1 ? prev.productCounter - 1 : 1
    }))
  }

  const handleModifierChange = (modifierItem: ItemMod, option: any) => {
    let updatedModifiers = [...state.selectedModifier];

    if (option.maxChoices === 1) {
      updatedModifiers = [modifierItem];
    } else {
      const alreadySelected = updatedModifiers.some(selected => selected.id === modifierItem.id);

      if (alreadySelected) {
        updatedModifiers = updatedModifiers.filter(selected => selected.id !== modifierItem.id);
      } else if (updatedModifiers.length < option.maxChoices) {
        updatedModifiers.push(modifierItem);
      }
    }

    setState((prev) => ({
      ...prev,
      selectedModifier: updatedModifiers,
      isDisabledBtn: false
    }));

    const totalModifiersPrice = updatedModifiers.reduce((total, modifier) => total + modifier.price, 0);

    setState((prev) => ({
      ...prev,
      selectedModifier: updatedModifiers,
      itemPrice: totalModifiersPrice,
    }));
  };

  return (
    <div className="container-modal">
      <div className="modal-content">
        {item.images ? (
          <article>
            <img
              className='img-details'
              src={item.images[0].image}
              alt={item.name}
            />
            <button className="modal-close" onClick={onClose}>
              <img src={CloseIcon} alt="" />
            </button>
          </article>
        ) : (
          <button className="modal-close without-img" onClick={onClose}>
            <img className='img-x' src={CloseIcon} alt="" />
          </button>
        )}

        <div className='subcontainer-details'>
          <h2 className='title-details'>{item.name}</h2>
          <p className='subtitle-details'>{translate(item.description ? item.description : '')}</p>

          {item && item.modifiers && item.modifiers.length > 0 && (
            <div>
              {item.modifiers.map((option) => (
                <div key={option.id}>
                  <section className='title-subtitle-modifiers'>
                    <span className='title-modifiers'>{option.name}</span>
                    <span className='subtitle-modifiers'>
                      {option.maxChoices > 1 ? `Select up to ${option.maxChoices} options` : `Select ${option.minChoices} option`}
                    </span>
                  </section>
                  <section className='flex-column container-modifiers'>
                    {option.items.filter(item => item.available).map((modifierItem) => (
                      <section key={modifierItem.id}>
                        <div className='flex-between' style={{ height: '72px' }}>
                          <div className='flex-column'>
                            <span className='name-modifiers'>{modifierItem.name}</span>
                            <span className='price-modifiers'>{formatPrice(modifierItem.price, locale, currency)}</span>
                          </div>

                          {option.maxChoices === 1 ? (
                            <label>
                              <input
                                type="radio"
                                className="custom-radio"
                                name={`modifier-${option.id}`}
                                onChange={() => handleModifierChange(modifierItem, option)}
                                checked={state.selectedModifier && state.selectedModifier.some(selected => selected.id === modifierItem.id)}
                              />
                              <span className="custom-radio-label"></span>
                            </label>

                          ) : (
                            <input
                              type="checkbox"
                              onChange={() => handleModifierChange(modifierItem, option)}
                              checked={state.selectedModifier && state.selectedModifier.some(selected => selected.id === modifierItem.id)}
                            />
                          )}
                        </div>
                      </section>
                    ))}
                  </section>
                </div>
              ))}
            </div>
          )}

          <div className='flex-center flex-column border-top' style={{ marginBottom: '20px' }}>
            <section className='subcontainer-plus-minus'>
              <button className='btn-minus-order' onClick={() => { handleMinus(); }}>
                <img src={MinusIcon} alt="" />
              </button>
              <p className='p-counter'>{state.productCounter}</p>
              <button className='btn-plus-order' onClick={() => { handlePlus(); }}>
                <img src={PlusIcon} alt="" />
              </button>
            </section>
            <div style={{ height: '48px' }}>
              <button
                className='btn-add-order'
                disabled={state.isDisabledBtn}
                onClick={() => { handleQuantityUpdate(item, state.productCounter, state.selectedModifier.length > 0, state.selectedModifier, state.itemPrice); onClose(); onOpen(); }}
              >
                {translate('Add to Order')} {formatPrice(state.itemPrice * state.productCounter, locale, currency)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalProductDetails;
