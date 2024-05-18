import {
  require_react_dom
} from "./chunk-FBRNPY62.js";
import {
  require_react
} from "./chunk-UM3JHGVO.js";
import {
  __toESM
} from "./chunk-CEQRFMJQ.js";

// node_modules/react-modal-hook/dist/index.es.js
var React = __toESM(require_react());
var import_react = __toESM(require_react());
var ReactDOM = __toESM(require_react_dom());
var invariantViolation = function() {
  throw new Error("Attempted to call useModal outside of modal context. Make sure your app is rendered inside ModalProvider.");
};
var ModalContext = React.createContext({
  showModal: invariantViolation,
  hideModal: invariantViolation
});
ModalContext.displayName = "ModalContext";
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
var ModalRenderer = (0, import_react.memo)(function(_a) {
  var component = _a.component, rest = __rest(_a, ["component"]);
  return component(rest);
});
var ModalRoot = (0, import_react.memo)(function(_a) {
  var modals = _a.modals, container = _a.container, _b = _a.component, RootComponent = _b === void 0 ? React.Fragment : _b;
  var _c = (0, import_react.useState)(void 0), mountNode = _c[0], setMountNode = _c[1];
  (0, import_react.useEffect)(function() {
    return setMountNode(container || document.body);
  });
  return mountNode ? ReactDOM.createPortal(React.createElement(RootComponent, null, Object.keys(modals).map(function(key) {
    return React.createElement(ModalRenderer, { key, component: modals[key] });
  })), mountNode) : null;
});
var ModalProvider = function(_a) {
  var container = _a.container, rootComponent = _a.rootComponent, children = _a.children;
  if (container && !(container instanceof HTMLElement)) {
    throw new Error("Container must specify DOM element to mount modal root into.\n\n    This behavior has changed in 3.0.0. Please use `rootComponent` prop instead.\n    See: https://github.com/mpontus/react-modal-hook/issues/18");
  }
  var _b = (0, import_react.useState)({}), modals = _b[0], setModals = _b[1];
  var showModal = (0, import_react.useCallback)(function(key, modal) {
    return setModals(function(modals2) {
      var _a2;
      return __assign(__assign({}, modals2), (_a2 = {}, _a2[key] = modal, _a2));
    });
  }, []);
  var hideModal = (0, import_react.useCallback)(function(key) {
    return setModals(function(modals2) {
      if (!modals2[key]) {
        return modals2;
      }
      var newModals = __assign({}, modals2);
      delete newModals[key];
      return newModals;
    });
  }, []);
  var contextValue = (0, import_react.useMemo)(function() {
    return { showModal, hideModal };
  }, []);
  return React.createElement(
    ModalContext.Provider,
    { value: contextValue },
    React.createElement(
      React.Fragment,
      null,
      children,
      React.createElement(ModalRoot, { modals, component: rootComponent, container })
    )
  );
};
var generateModalKey = /* @__PURE__ */ function() {
  var count = 0;
  return function() {
    return "".concat(++count);
  };
}();
var isFunctionalComponent = function(Component) {
  var prototype = Component.prototype;
  return !prototype || !prototype.isReactComponent;
};
var useModal = function(component, inputs) {
  if (inputs === void 0) {
    inputs = [];
  }
  if (!isFunctionalComponent(component)) {
    throw new Error("Only stateless components can be used as an argument to useModal. You have probably passed a class component where a function was expected.");
  }
  var key = (0, import_react.useMemo)(generateModalKey, []);
  var modal = (0, import_react.useMemo)(function() {
    return component;
  }, inputs);
  var context = (0, import_react.useContext)(ModalContext);
  var _a = (0, import_react.useState)(false), isShown = _a[0], setShown = _a[1];
  var showModal = (0, import_react.useCallback)(function() {
    return setShown(true);
  }, []);
  var hideModal = (0, import_react.useCallback)(function() {
    return setShown(false);
  }, []);
  (0, import_react.useEffect)(function() {
    if (isShown) {
      context.showModal(key, modal);
    } else {
      context.hideModal(key);
    }
    return function() {
      return context.hideModal(key);
    };
  }, [modal, isShown]);
  return [showModal, hideModal];
};
export {
  ModalContext,
  ModalProvider,
  useModal
};
//# sourceMappingURL=react-modal-hook.js.map
