import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface HideHeaderPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HideHeaderPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
