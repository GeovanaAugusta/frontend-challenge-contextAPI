import React, { useEffect, useState } from 'react';
import '../../styles.css';
import { ModalI } from './interface';
import CloseIcon from '../../../assets/icons/close.png';
import PlusIcon from '../../../assets/icons/plus.png';
import MinusIcon from '../../../assets/icons/minus.png';
import { INITIAL_STATE } from './constants';
import { ItemMod } from '../../../Interfaces/MenuI';
import { formatPrice } from '../../../utils/currency';
import { translate } from '../../../utils/locales/i18n';
import { useGlobalContext } from '../../../context/global-context';

const ModalProductDetails: React.FC<ModalI> = ({ onClose, onProductCounter, onOpen }) => {
  const { state, setState } = useGlobalContext();
  const [stateI, setStateI] = useState({
    ...INITIAL_STATE,
    productCounter: state.selectedItemObject[state.selectedItem.name] || 0,
    itemPrice: state.itemPrice ? state.itemPrice : state.selectedItem.price
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      itemPrice: state.itemPrice ? state.itemPrice : state.selectedItem.price
    }))

    const currentItem = state.updatedItems.find(updatedItem => updatedItem.item.name === state.selectedItem.name);
    if (currentItem) {
      if (currentItem.quantity === 0 && currentItem.item.modifiers) {
        setStateI(prevState => ({
          ...prevState,
          selectedModifier: [],
          itemPrice: 0,
          isDisabledBtn: true
        }));

        setState(prevState => ({
          ...prevState,
          selectedModifier: [],
          itemPrice: 0,
        }))
      }
    }
  }, [state.updatedItems, state.selectedItem.name]);

  if (!state.selectedItem) return null;

  const handlePlus = () => {
    setStateI((prev) => ({
      ...prev,
      productCounter: stateI.productCounter + 1
    }))
  }

  const handleMinus = () => {
    setStateI((prev) => ({
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

    setStateI((prev) => ({
      ...prev,
      selectedModifier: updatedModifiers,
      isDisabledBtn: false
    }));

    const totalModifiersPrice = updatedModifiers.reduce((total, modifier) => total + modifier.price, 0);

    setStateI((prev) => ({
      ...prev,
      selectedModifier: updatedModifiers,
      itemPrice: totalModifiersPrice,
    }));

    setState(prevState => ({
      ...prevState,
      itemPrice: totalModifiersPrice,
      selectedModifier: updatedModifiers
    }))
  };

  return (
    <div className="container-modal">
      <div className="modal-content">
        {state.selectedItem.images ? (
          <article>
            <img
              className='img-details'
              src={state.selectedItem.images[0].image}
              alt={state.selectedItem.name}
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
          <h2 className='title-details'>{state.selectedItem.name}</h2>
          <p className='subtitle-details'>{translate(state.selectedItem.description ? state.selectedItem.description : '')}</p>

          {state.selectedItem && state.selectedItem.modifiers && state.selectedItem.modifiers.length > 0 && (
            <div>
              {state.selectedItem.modifiers.map((option) => (
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
                            <span className='price-modifiers'>{formatPrice(modifierItem.price, state.locale, state.currency)}</span>
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
              <p className='p-counter'>{stateI.productCounter}</p>
              <button className='btn-plus-order' onClick={() => { handlePlus(); }}>
                <img src={PlusIcon} alt="" />
              </button>
            </section>
            <div style={{ height: '48px' }}>
              <button
                className='btn-add-order'
                disabled={stateI.isDisabledBtn}
                onClick={() => { onProductCounter(state.selectedItem, stateI.productCounter, state.selectedModifier.length > 0, state.selectedModifier, state.itemPrice); onClose(); onOpen(); }}
              >
                {translate('Add to Order')} {formatPrice(state.itemPrice * stateI.productCounter, state.locale, state.currency)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalProductDetails;
