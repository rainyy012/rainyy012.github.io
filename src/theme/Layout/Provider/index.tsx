import React, {type ReactNode} from 'react';
import {composeProviders} from '@docusaurus/theme-common';
import {
  ColorModeProvider,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider,
} from '@docusaurus/theme-common/internal';
import {DocsPreferredVersionContextProvider} from '@docusaurus/plugin-content-docs/client';
import type {Props} from '@theme/Layout/Provider';
import {CustomFontFamilyProvider} from '@site/src/components/custom-font';
import {CustomToastContainer} from '@site/src/components/custom-toast-container';
import {CheckSafariBrowserProvider} from '@site/src/hooks/browser';

const Provider = composeProviders([
  CheckSafariBrowserProvider,
  ColorModeProvider,
  CustomFontFamilyProvider,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  DocsPreferredVersionContextProvider,
  PluginHtmlClassNameProvider,
  NavbarProvider,
]);

export default function LayoutProvider({children}: Props): ReactNode {
  return (
    <Provider>
      {children}
      <CustomToastContainer />
    </Provider>
  );
}
