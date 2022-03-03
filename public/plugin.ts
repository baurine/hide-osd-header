import { i18n } from '@osd/i18n';
import { AppMountParameters, AppNavLinkStatus, CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import { HideHeaderPluginSetup, HideHeaderPluginStart, AppPluginStartDependencies } from './types';
import { PLUGIN_NAME } from '../common';

export class HideHeaderPlugin implements Plugin<HideHeaderPluginSetup, HideHeaderPluginStart> {
  private removeHeader() {
    const observer = new MutationObserver((mutations) => {
      console.log('mutations:', mutations);

      for (const mutation of mutations) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          if (!(node instanceof HTMLElement)) continue;
          if (node.nodeName === 'HEADER' && node.classList.contains('headerGlobalNav')) {
            node.firstChild?.remove();
            document.body.style.paddingTop = '10px';
            observer.disconnect();
            break;
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  public setup(core: CoreSetup): HideHeaderPluginSetup {
    console.log('load hide header plugin')
    this.removeHeader()

    // Register an application into the side navigation menu
    core.application.register({
      id: 'hideHeader',
      title: PLUGIN_NAME,
      navLinkStatus: AppNavLinkStatus.hidden,
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in opensearch_dashboards.json
        const [coreStart, depsStart] = await core.getStartServices();
        // Render the application
        return renderApp(coreStart, depsStart as AppPluginStartDependencies, params);
      },
    });

    // Return methods that should be available to other plugins
    return {
      getGreeting() {
        return i18n.translate('hideHeader.greetingText', {
          defaultMessage: 'Hello from {name}!',
          values: {
            name: PLUGIN_NAME,
          },
        });
      },
    };
  }

  public start(core: CoreStart): HideHeaderPluginStart {
    return {};
  }

  public stop() {}
}
