import { Fragment, createRef } from 'react';
import PropTypes from 'prop-types';

import SourceHeader, {
    PDP,
    CATEGORY,
    CUSTOMER_ACCOUNT,
    CUSTOMER_ACCOUNT_PAGE,
    HOME_PAGE,
    MENU,
    MENU_SUBCATEGORY,
    SEARCH,
    FILTER,
    CART,
    CART_EDITING,
    CHECKOUT,
    CMS_PAGE,
    POPUP
} from 'SourceComponent/Header/Header.component';
import MenuOverlay from 'Component/MenuOverlay';
import CartOverlay from 'Component/CartOverlay';
import ClickOutside from 'Component/ClickOutside';
import SearchOverlay from 'Component/SearchOverlay';
import MyAccountOverlay from 'Component/MyAccountOverlay';

import './Header.style';

export {
    PDP,
    POPUP,
    CATEGORY,
    CUSTOMER_ACCOUNT,
    CUSTOMER_ACCOUNT_PAGE,
    HOME_PAGE,
    MENU,
    MENU_SUBCATEGORY,
    SEARCH,
    FILTER,
    CART,
    CART_EDITING,
    CHECKOUT,
    CMS_PAGE,
} from 'SourceComponent/Header/Header.component';

export default class Header extends SourceHeader {
    constructor(props) {
        super(props);

        console.log(this);
    }

    static propTypes = {
        ...this.propTypes,
        onSearchBarClick: PropTypes.func.isRequired,
    };

    stateMap = {
        [POPUP]: {
            title: true,
            close: true
        },
        [PDP]: {
            back: true,
            title: true,
            minicart: true
        },
        [CATEGORY]: {
            back: true,
            menu: true,
            title: true,
            minicart: true
        },
        [CUSTOMER_ACCOUNT]: {
            close: true,
            title: true
        },
        [CUSTOMER_ACCOUNT_PAGE]: {
            back: true,
            title: true
        },
        [HOME_PAGE]: {
            menu: true,
            title: true,
            account: true,
            minicart: true,
            logo: true
        },
        [MENU]: {
            close: true,
            search: true
        },
        [MENU_SUBCATEGORY]: {
            back: true,
            title: true
        },
        [SEARCH]: {
            back: true,
            search: true
        },
        [CART]: {
            close: true,
            title: true,
            edit: true
        },
        [CART_EDITING]: {
            ok: true,
            title: true,
            cancel: true
        },
        [FILTER]: {
            close: true,
            clear: true,
            title: true
        },
        [CHECKOUT]: {
            back: true,
            title: true
        },
        [CMS_PAGE]: {
            back: true,
            title: true
        }
    };

    searchBarRef = createRef();

    onClearSearchButtonClick = this.onClearSearchButtonClick.bind(this);

    onClearSearchButtonClick() {
        const { onClearSearchButtonClick } = this.props;
        this.searchBarRef.current.focus();
        onClearSearchButtonClick();
    }

    renderMenuButton(isVisible = false) {
        const { onMenuOutsideClick, onMenuButtonClick } = this.props;

        return (
            <ClickOutside onClick={ onMenuOutsideClick } key="menu">
                <div>
                    <button
                      block="Header"
                      elem="Button"
                      mods={ { isVisible, type: 'menu' } }
                      aria-label="Go to menu and search"
                      aria-hidden={ !isVisible }
                      tabIndex={ isVisible ? 0 : -1 }
                      onClick={ onMenuButtonClick }
                    />
                    <MenuOverlay />
                </div>
            </ClickOutside>
        );
    }

    renderSearchField(isSearchVisible = false) {
        const {
            searchCriteria, onSearchOutsideClick,
            onSearchBarClick, onSearchBarChange
        } = this.props;

        return (
            <Fragment key="search">
                <ClickOutside onClick={ onSearchOutsideClick }>
                    <div
                      block="Header"
                      elem="SearchWrapper"
                      aria-label="Search"
                    >
                            <input
                              id="search-field"
                              ref={ this.searchBarRef }
                              placeholder={ __('Type a new search') }
                              block="Header"
                              elem="SearchField"
                              onClick={ onSearchBarClick }
                              onChange={ onSearchBarChange }
                              value={ searchCriteria }
                              mods={ {
                                  isVisible: isSearchVisible,
                                  type: 'searchField'
                              } }
                            />
                            <SearchOverlay
                              searchCriteria={ searchCriteria }
                            />
                    </div>
                </ClickOutside>
                <button
                  block="Header"
                  elem="Button"
                  onClick={ this.onClearSearchButtonClick }
                  mods={ {
                      type: 'searchClear',
                      isVisible: isSearchVisible
                  } }
                  aria-label="Clear search"
                />
            </Fragment>
        );
    }

    renderAccountButton(isVisible = false) {
        const { onMyAccountOutsideClick, onMyAccountButtonClick } = this.props;

        return (
            <ClickOutside onClick={ onMyAccountOutsideClick } key="account">
                <div aria-label="My account">
                    <button
                      block="Header"
                      elem="Button"
                      mods={ { isVisible, type: 'account' } }
                      onClick={ onMyAccountButtonClick }
                      aria-label="Open my account"
                    />
                    <MyAccountOverlay />
                </div>
            </ClickOutside>
        );
    }

    renderMinicartButton(isVisible = false) {
        const { cartTotals: { items_qty }, onMinicartOutsideClick, onMinicartButtonClick } = this.props;

        return (
            <ClickOutside onClick={ onMinicartOutsideClick } key="minicart">
                <div>
                    <button
                      block="Header"
                      elem="Button"
                      mods={ { isVisible, type: 'minicart' } }
                      onClick={ onMinicartButtonClick }
                      aria-label="Minicart"
                    >
                        <span aria-label="Items in cart">{ items_qty || '0' }</span>
                    </button>
                    <CartOverlay />
                </div>
            </ClickOutside>
        );
    }

    renderEditButton(isVisible = false) {
        const { onEditButtonClick } = this.props;

        return (
            <button
              key="edit"
              block="Header"
              elem="Button"
              mods={ { type: 'edit', isVisible } }
              onClick={ onEditButtonClick }
              aria-label="Clear"
              aria-hidden={ !isVisible }
              tabIndex={ isVisible ? 0 : -1 }
            />
        );
    }

    renderHeaderState() {
        const { navigationState: { name } } = this.props;

        const source = this.stateMap[name]
            ? this.stateMap[name]
            : this.stateMap[HOME_PAGE];

        console.log("this.stateMap[name]");
        console.log(this.stateMap[name]);
        console.log(this.stateMap);

        return Object.entries(this.renderMap).map(
            ([key, renderFunction]) => renderFunction(source[key])
        );
    }

    render() {
        const { navigationState: { name } } = this.props;

        return (
            <header block="Header" mods={ { name } }>
                <nav block="Header" elem="Nav">
                    { this.renderHeaderState() }
                </nav>
            </header>
        );
    }
}