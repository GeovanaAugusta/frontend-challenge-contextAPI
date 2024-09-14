import { useEffect, useState } from 'react';
import { INITIAL_STATE } from './constants';
import { fetchMenuDetails } from '../../api/services/MenuDetails';
import arrowIcon from '../../assets/icons/arrow.png';
import ModalProductDetails from '../Modals/ModalProductDetails/app';
import { ItemMod, Items } from '../../Interfaces/MenuI';
import PlusIcon from '../../assets/icons/plus-small.png';
import MinusIcon from '../../assets/icons/minus-small.png';
import { fetchARestaurantsById } from '../../api/services/RestaurantDetails';
import { formatPrice } from '../../utils/currency';
import ModalBasket from '../Modals/ModalBasket/app';
import { useLanguage } from '../../utils/locales/LanguageContext';
import { translate } from '../../utils/locales/i18n';
import { RestaurantI } from '../../api/interface';
import { useGlobalContext } from '../../context/global-context';


const saveToLocalStorage = (state: typeof INITIAL_STATE) => {
  localStorage.setItem('cartState', JSON.stringify(state));
};

const MenuItems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { changeLanguage } = useLanguage();
  const { state, setState } = useGlobalContext();

  useEffect(() => {
    const handleResize = () => {
      setState((prev) => ({
        ...prev,
        isMobile: window.innerWidth < 1000,
        isDesktop: window.innerWidth === 1480,
      }));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const getMenu = async () => {
      const id = 9;
      const menuData = await fetchMenuDetails();

      if (menuData) {
        const restaurantData: RestaurantI = await fetchARestaurantsById(id);
        changeLanguage(restaurantData.locale)
        setState((prev) => ({
          ...prev,
          menu: menuData.sections,
          locale: restaurantData.locale,
          currency: restaurantData.ccy
        }));
      }
    };

    getMenu();
  }, []);

  useEffect(() => {
    saveToLocalStorage(state);
  }, [state]);

  useEffect(() => {
    const allCountersZero = state.productCounter.every(count => count === 0);

    if (allCountersZero && state.updatedQuantity === 0) {
      setState(prev => ({
        ...prev,
        selectedModifier: []
      }));
    }
  }, [state.productCounter, state.updatedQuantity]);


  const handleClick = (id: number) => {
    setState((prev) => ({
      ...prev,
      selectedId: id,
    }));
    const sectionElement = document.getElementById(`section-${id}`);

    if (sectionElement) {
      sectionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const calculateTotalPriceWithModifiers = (item: Items, selectedModifier: ItemMod[], quantity: number): number => {
    let totalPrice = item.price;

    if (item.modifiers) {
      item.modifiers.forEach(modifierGroup => {
        modifierGroup.items.forEach(modifierItem => {
          if (selectedModifier.some(selected => selected.id === modifierItem.id)) {
            totalPrice += modifierItem.price;
          }
        });
      });

      return totalPrice * quantity;
    }
    return 0
  };

  const handleItemClick = (item: Items, quantity: number) => {
    const totalPrice = calculateTotalPriceWithModifiers(item, state.selectedModifier, quantity) / quantity;

    setState((prev) => ({
      ...prev,
      selectedItem: item,
      isModalOpen: true,
      selectedItemObject: { [item.name]: (quantity === 0 ? 1 : quantity) },
    }));

    if (item.modifiers) {
      setState((prev) => ({
        ...prev,
        itemPrice: totalPrice,
      }));
    }
  };

  const handlePriceUpdate = (price: number) => {
    setState((prev) => ({
      ...prev,
      updatedPrice: price
    }));
  };

  const handlePlus = (index: number) => {
    setState((prev) => {
      const updatedCounters = [...prev.productCounter];
      const updatedItems = [...prev.updatedItems];

      if (updatedCounters[index] === undefined) {
        updatedCounters[index] = 1;
      } else {
        updatedCounters[index] += 1;
      }

      const existingItemIndex = updatedItems.findIndex(
        (item) => item.item.id === prev.updatedItems[index].item.id
      );

      if (existingItemIndex !== -1) {
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedCounters[index]
        };
      }

      const newTotal = updatedItems.map((item) => item.quantity * item.item.price);

      return {
        ...prev,
        productCounter: updatedCounters,
        updatedItems: updatedItems,
        total: newTotal,
        updatedQuantity: updatedCounters.reduce((acc, updCounter) => acc + updCounter, 0)
      };
    });
  };

  const handleMinus = (index: number) => {
    setState((prev) => {
      const updatedCounters = [...prev.productCounter];
      const updatedItems = [...prev.updatedItems];

      if (updatedCounters[index] === undefined) {
        updatedCounters[index] = 1;
      } else if (updatedCounters[index] > 0) {
        updatedCounters[index] -= 1;
      }

      const existingItemIndex = updatedItems.findIndex(
        (item) => item.item.id === prev.updatedItems[index].item.id
      );

      if (existingItemIndex !== -1) {
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedCounters[index]
        };
      }

      const newTotal = updatedItems.map((item) => item.quantity * item.item.price);

      return {
        ...prev,
        productCounter: updatedCounters,
        updatedItems: updatedItems,
        total: newTotal,
        updatedQuantity: updatedCounters.reduce((acc, updCounter) => acc + updCounter, 0)
      };
    });
  };

  const handleQuantityUpdate = (
    items: Items,
    quantity: number,
    isModifier: boolean,
    selectedModifier: ItemMod[],
    itemPrice: number,
    callback: () => void
  ) => {
    
    setState((prev) => {
      const existingItemIndex = prev.updatedItems.findIndex(
        (existing) => existing.item.id === items.id
      );

      let updatedItems;
      let updatedProductCounter = [...prev.productCounter];

      if (existingItemIndex !== -1) {
        updatedItems = prev.updatedItems.map((existing, index) =>
          index === existingItemIndex ? { ...existing, quantity } : existing
        );
        updatedProductCounter[existingItemIndex] = quantity;
      } else {
        updatedItems = [...prev.updatedItems, { item: items, quantity }];
        updatedProductCounter = [...updatedProductCounter, quantity];
      }

      const newTotal = updatedItems.map((item) => item.quantity * item.item.price);

      const updateProductCounter = updatedProductCounter.reduce((acc, cur) => acc + cur, 0);
    

      return {
        ...prev,
        updatedQuantity: updatedProductCounter[existingItemIndex],
        updatedItems: updatedItems,
        productCounter: updatedProductCounter,
        total: newTotal,
        isModifier,
        selectedModifier,
        itemPrice,
        updateProductCounter
      };
    });

    callback();
  };

  const truncateDescription = (description: string | undefined | null, maxLength: number) => {
    if (description !== undefined && description !== null && description.length > maxLength) {
      return description.slice(0, maxLength) + '...';
    }
    return description;
  };

  const calculateTotal = () => {
    return state.total.reduce((acc, cur) => acc + cur, 0);
  };

  const filteredMenu = state.menu.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  return (
    <>
      {!state.isMobile && (
        <div className="search-wrapper">
          <input
            id="menu-search"
            className={`input-search ${state.isDesktop ? 'desktop-input-search' : ''}`}
            type="search"
            placeholder={translate('Search menu items')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search through menu items"
          />
        </div>
      )}

      <section className={`${!state.isMobile ? 'container-menu' : ''}`}>
        <div className="subcontainer-menu">
          {state.isMobile && (
            <div className="search-wrapper">
              <input
                id="menu-search-mobile"
                className={`input-search ismobile ${state.isDesktop ? 'desktop-input-search' : ''}`}
                type="search"
                placeholder={translate('Search menu items')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search through menu items"
              />
            </div>
          )}
          <div className="container-options-menu" role="navigation" aria-label="Menu options">
            {filteredMenu.map((item) => (
              <article
                key={item.id}
                className="subcontainer-options-menu"
                onClick={() => handleClick(item.id)}
                tabIndex={0}
                role="button"
                aria-pressed={state.selectedId === item.id}
              >
                <img
                  className={`img-options-menu ${state.selectedId === item.id ? 'selected-option' : ''}`}
                  src={item.images[0].image}
                  alt={`${item.name}`}
                />
                <p className={`title-options-menu ${state.selectedId === item.id ? 'selected-title' : ''}`}>
                  {translate(item.name)}
                </p>
                {state.selectedId === item.id && <div className="selected-option-risk"></div>}
              </article>
            ))}
          </div>

          {filteredMenu.map((section) => (
            section.items.length > 0 && (
              <article key={section.id} id={`section-${section.id}`} aria-labelledby={`heading-${section.id}`} className='article-menu-items'>
                <section className="container-details-options">
                  <div className="section-header" id={`heading-${section.id}`}>
                    <h2 className="section-name">{translate(section.name)}</h2>
                    <img src={arrowIcon} alt={`Expand ${section.name} section`} />
                  </div>
                  {section.items.filter(item => item.available).map((item) => {
                    const itemIndex = state.updatedItems.findIndex(basketItem => basketItem.item.id === item.id);
                    const selectedQuantity = itemIndex !== -1 ? state.productCounter[itemIndex] || 0 : 0;
                    return (
                      <div
                        key={item.id}
                        className="container-item"
                        onClick={() => handleItemClick(item, selectedQuantity)}
                        tabIndex={0}
                        role="button"
                        aria-pressed={selectedQuantity > 0}
                      >
                        <div>
                          <div className="counter-name">
                            {selectedQuantity > 0 && (
                              <span className="counter-by-section">{selectedQuantity}</span>
                            )}
                            <span className="title-item">{item.name}</span>
                          </div>
                          <p className="description-item">{truncateDescription(translate(item.description ? item.description : ''), 50)}</p>
                          <p className="price-item">{formatPrice(item.price === 0 && selectedQuantity > 0 ? state.itemPrice : item.price, state.locale, state.currency)}</p>
                        </div>
                        {item.images && (
                          <img className="img-item" src={item.images[0].image} alt={item.name} />
                        )}
                      </div>
                    );
                  })}
                </section>
              </article>
            )
          ))}
          <section className="ancor-section">
            <a className="ancor-alergy" href="allergy-information.html">{translate('View allergy information')}</a>
          </section>
        </div>

        {!state.isMobile && (
          <div className="subcontainer-basket" aria-label="Shopping cart">
            <div className="subcontainer-basket-1">
              <h2 className="title-basket">{translate('Basket')}</h2>
            </div>
            <div className="subcontainer-basket-2">
              {state.updateProductCounter > 0 ? (
                state.updatedItems.map((basket, index) => (
                  state.productCounter[index] > 0 && (
                    <div key={index} >
                      <div className="subcontainer-basket-2-1">
                        <div className="container-name-counter">
                          <p className="title-basket-name">{basket.item.name}</p>
                          {basket.item.modifiers &&
                            basket.item.modifiers.map((modifier) =>
                              modifier.items
                                .filter((modifierItem) =>
                                  state.selectedModifier.some((mod) => mod.id === modifierItem.id)
                                )
                                .map((modifierItem) => {
                                  const selectedModifier = state.selectedModifier.find(
                                    (mod) => mod.id === modifierItem.id
                                  );

                                  if (selectedModifier) {
                                    basket.item.price = selectedModifier.price;
                                  }

                                  return (
                                    <div key={modifierItem.id}>
                                      <p className="modifier-name">
                                        {selectedModifier && translate('With') + translate(selectedModifier.name)}
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
                              {state.productCounter[index] > 0 ? state.productCounter[index] : basket.quantity}
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
                          {formatPrice(basket.item.price * (state.productCounter[index] > 0 ? state.productCounter[index] : basket.quantity), state.locale, state.currency)}
                        </p>
                      </div>
                    </div>
                  )
                ))
              ) : (
                <p className="subtitle-basket">{translate('Your basket is empty')}</p>
              )}
            </div>

            {state.updateProductCounter > 0 && (
              <>
                <div className="subcontainer-basket-1-2">
                  <div className="subcontainer-basket-2-1-1 border-2-1-1">
                    <p className="title-total-basket subtotal-b">Sub total:</p>
                    <p className="title-total-basket price subtotal-price">{formatPrice(calculateTotal(), state.locale, state.currency)}</p>
                  </div>
                  <div className="subcontainer-basket-2-1-1">
                    <p className="title-total-basket">Total:</p>
                    <p className="title-total-basket price">{formatPrice(calculateTotal(), state.locale, state.currency)}</p>
                  </div>
                </div>
                <button className="btn-add-order checkout">{translate('Checkout now')}</button>
              </>
            )}
          </div>
        )}

        {state.isModalOpenBasket && state.isMobile && (
          <ModalBasket
            handleMinus={handleMinus}
            handlePlus={handlePlus}
            calculateTotal={calculateTotal}
            onClose={() => setState((prev) => ({ ...prev, isModalOpenBasket: false }))} />
        )}

        {state.isModalOpen && (
          <div className="overlay" role="dialog" aria-modal="true">
            <ModalProductDetails
              onProductCounter={handleQuantityUpdate}
              onPriceUpdate={handlePriceUpdate}
              onClose={() => setState((prev) => ({ ...prev, isModalOpen: false }))}
              onOpen={() => {
                setState((prev) => ({ ...prev, isModalOpenBasket: true }))
              }}
            />
          </div>
        )}
      </section>
    </>

  );
};

export default MenuItems;


