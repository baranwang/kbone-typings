export interface KboneConfig<R = Record<string, string[]>> {
  origin: string;
  entry: string;
  router: R;
  redirect: Record<
    'notFound' | 'accessDenied',
    'none' | 'webview' | 'error' | keyof KboneConfig['router']
  >;
  generate: {
    app: 'defalut' | 'noemit' | 'noconfig';
    appWxss: 'default' | 'none' | 'display';
    subpackages: Record<string, string[]>;
    preloadRule: Record<
      string,
      {
        network: 'all' | 'wifi';
        packages: string[];
      }
    >;
    tabBar: {
      color: string;
      selectedColor: string;
      backgroundColor: string;
      borderStyle: 'black' | 'white';
      list: Array<{
        pageName: keyof KboneConfig['router'];
        text: string;
        iconPath: string;
        selectedIconPath: string;
      }>;
      position: 'bottom' | 'top';
      custom: string;
    };
    appEntry: string;
    wxCustomComponent: {
      root: string;
      usingComponents: Record<
        string,
        | string
        | {
            path: string;
            props: string[];
            events: string[];
          }
      >;
    };
    globalVars: [string, string][];
    autoBuildNpm: boolean | 'npm' | 'yarn';
    projectConfig: string;
  };
  runtime: {
    wxComponent: 'default' | 'noprefix';
    cookieStore:
      | 'default'
      | 'storage'
      | 'memory'
      | 'globalstorage'
      | 'globalmemory';
  };
  app: MiniprogramWindow;
  appExtraConfig: any;
  global: KbonePageConfig;
  pages: Record<string, KbonePageConfig>;
  optimization: {
    domSubTreeLevel: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    elementMultiplexing: boolean;
    textMultiplexing: boolean;
    commentMultiplexing: boolean;
    domExtendMultiplexing: boolean;
    styleValueReduce: number;
    attrValueReduce: number;
  };
  projectConfig: {
    appid: string;
    projectname: string;
  };
  packageConfig: Record<string, any>;
  sitemapConfig: {
    rules: Array<{
      action: 'allow' | 'disallow';
      page: string;
      params: string[];
      matching: 'exact' | 'inclusive' | 'exclusive' | 'partial';
      priority: number;
    }>;
  };
}

interface MiniprogramWindow {
  navigationBarBackgroundColor: string;
  navigationBarTextStyle: 'black' | 'white';
  navigationBarTitleText: string;
  navigationStyle: 'default' | 'custom';
  backgroundColor: string;
  backgroundTextStyle: 'dark' | 'light';
  backgroundColorTop: string;
  backgroundColorBottom: string;
  enablePullDownRefresh: boolean;
  onReachBottomDistance: number;
  pageOrientation: 'auto' | 'portrait' | 'landscape';
}

interface KbonePageConfig {
  loadingText: string;
  share: boolean;
  windowScroll: boolean;
  pageBackgroundColor: string;
  reachBottom: boolean;
  reachBottomDistance: boolean;
  pullDownRefresh: boolean;
  rem: boolean;
  pageStyle: boolean;
  extra: MiniprogramWindow;
}

type PrototypeDescriptor =
  | 'window.location'
  | 'window.navigator'
  | 'window.performance'
  | 'window.screen'
  | 'window.history'
  | 'window.localStorage'
  | 'window.sessionStorage'
  | 'window.event'
  | 'window'
  | 'document'
  | 'element.attribute'
  | 'element.classList'
  | 'element.style'
  | 'element'
  | 'textNode'
  | 'comment';

declare global {
  interface Window {
    $$miniprogram: {
      window: Window;
      document: Document;
      config: KboneConfig;
    };
    $$global: Record<any, any>;
    $$trigger(
      eventName: string,
      options?: {
        event?: any;
        isCapture?: boolean;
      }
    ): void;
    $$clearEvent(eventName: string, isCapture?: boolean): void;
    $$getComputedStyle(
      dom: string,
      computedStyle?: string[]
    ): Promise<CSSStyleDeclaration>;
    $$createSelectorQuery(): WechatMiniprogram.SelectorQuery;
    $$createIntersectionObserver: typeof wx.createIntersectionObserver;
    $$getOpenerEventChannel: WechatMiniprogram.EventChannel;
    $$forceRender(): void;
    $$getPrototype(descriptor: PrototypeDescriptor): void;
    $$extend(
      descriptor: PrototypeDescriptor,
      options: Record<string, any>
    ): void;
    $$addAspect(
      descriptor:
        | PrototypeDescriptor
        | 'element.hasChildNodes.before'
        | 'element.hasChildNodes.after',
      func: Function
    ): void;
    $$removeAspect(
      descriptor:
        | PrototypeDescriptor
        | 'element.hasChildNodes.before'
        | 'element.hasChildNodes.after',
      func: Function
    ): void;
    $$subscribe(name: string, handler: Function): void;
    $$unsubscribe(name: string, handler: Function): void;
    $$publish(name: string, data: any): void;
    onShareAppMessage(
      options: WechatMiniprogram.Page.IShareAppMessageOption & {
        miniprogramPath: string;
      }
    ): WechatMiniprogram.Page.ICustomShareContent;
    onDealWithNotSupportDom(dom: Element): void;
  }
  interface Document {
    $$cookie: Document['cookie'];
    $$trigger: Window['$$trigger'];
    $$clearEvent: Window['$$clearEvent'];
    $$setCookie(cookie: string): void;
  }
  interface HTMLElement {
    $$trigger: Window['$$trigger'];
    $$clearEvent: Window['$$clearEvent'];
    $$getBoundingClientRect(): Promise<DOMRect>;
    $$getContext(): Promise<WechatMiniprogram.ContextCallbackResult['context']>;
    $$getNodesRef(): Promise<WechatMiniprogram.NodesRef>;
    $$domNodeUpdate(): void;
    $$childNodesUpdate(): void;
    $$prepare(): Promise<HTMLCanvasElement>;
  }
}
