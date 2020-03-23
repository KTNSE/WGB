import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import SourceOverlay from 'SourceComponent/Overlay/Overlay.component';

import isMobile from 'Util/Mobile';
import { MixType, ChildrenType } from 'Type/Common';

export default class Overlay extends SourceOverlay {
    static propTypes = {
        mix: MixType,
        id: PropTypes.string.isRequired,
        onVisible: PropTypes.func,
        onHide: PropTypes.func,
        activeOverlay: PropTypes.string.isRequired,
        areOtherOverlaysOpen: PropTypes.bool.isRequired,
        renderInPortal: PropTypes.bool,
        isFreezeEnabled: PropTypes.bool,
        children: ChildrenType
    };

    static defaultProps = {
        mix: {},
        children: [],
        onVisible: () => {},
        renderInPortal: true,
        isFreezeEnabled: true,
        onHide: () => {}
    };

    onVisible() {
        const { onVisible } = this.props;
        if (isMobile.any()) this.freezeScroll();
        this.overlayRef.current.focus();
        onVisible();
    }

    onHide() {
        const { onHide } = this.props;
        if (isMobile.any()) this.unfreezeScroll();
        onHide();
    }

    getIsVisible(props = this.props) {
        const { id, activeOverlay } = props;
        return id === activeOverlay;
    }

    freezeScroll() {
        const { isFreezeEnabled } = this.props;
        if (!isFreezeEnabled) return;
        this.YoffsetWhenScrollDisabled = window.pageYOffset || document.documentElement.scrollTop;
        document.body.classList.add('scrollDisabled');
        document.body.style.marginTop = `${-this.YoffsetWhenScrollDisabled}px`;
    }

    unfreezeScroll() {
        const { isFreezeEnabled } = this.props;
        if (!isFreezeEnabled) return;
        document.body.classList.remove('scrollDisabled');
        document.body.style.marginTop = 0;
        window.scrollTo(0, this.YoffsetWhenScrollDisabled);
    }

    renderInMobilePortal(content) {
        const { renderInPortal } = this.props;

        if (renderInPortal && isMobile.any()) {
            return createPortal(content, document.body);
        }

        return content;
    }

    render() {
        const {
            children,
            mix,
            areOtherOverlaysOpen
        } = this.props;

        const isVisible = this.getIsVisible();

        return this.renderInMobilePortal(
            <div
              block="Overlay"
              ref={ this.overlayRef }
              mods={ { isVisible, isInstant: areOtherOverlaysOpen } }
              mix={ { ...mix, mods: { ...mix.mods, isVisible } } }
            >
                { children && children }
            </div>
        );
    }
}