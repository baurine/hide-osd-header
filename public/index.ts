import './index.scss';

import { HideHeaderPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.
export function plugin() {
  return new HideHeaderPlugin();
}
export { HideHeaderPluginSetup, HideHeaderPluginStart } from './types';
