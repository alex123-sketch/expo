import {
  ParamListBase,
  StackNavigationState,
  type NavigationRoute,
  type NavigationState,
  type TabNavigationState,
} from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { store, type ReactNavigationState } from '../../global-state/router-store';
import {
  getNavigatorForWhichStateDoesNotExist,
  getPayloadFromStateRoute,
} from '../../global-state/routing';
import { Href } from '../../types';
import { resolveHref } from '../href';

export function useNextScreenId(): [string | undefined, (href: Href) => void] {
  const [internalNextScreenId, internalSetNextScreenId] = useState<string | undefined>();
  const setNextScreenId = useCallback((href: Href): void => {
    const preloadedRoute = getPreloadedRouteFromRootStateByHref(href);
    console.log(preloadedRoute, 'preloadedRoute');
    const routeKey = preloadedRoute?.key;
    internalSetNextScreenId(routeKey);
  }, []);
  return [internalNextScreenId, setNextScreenId];
}

function getPreloadedRouteFromRootStateByHref(
  href: Href
): NavigationRoute<ParamListBase, string> | undefined {
  const rootState = store.state;
  console.log(rootState, 'rootState');
  const hrefState = store.getStateForHref(resolveHref(href));
  const state: ReactNavigationState | undefined = rootState;
  if (!hrefState || !state) {
    return undefined;
  }
  const { navigationState, actionStateRoute } = getNavigatorForWhichStateDoesNotExist(
    hrefState,
    state as NavigationState
  );

  console.log('navigationState', navigationState);
  console.log('actionStateRoute', actionStateRoute);

  if (!navigationState || !actionStateRoute) {
    return undefined;
  }

  if (navigationState.type === 'stack') {
    const stackState = navigationState as StackNavigationState<ParamListBase>;
    // Sometimes the route is stored inside params
    const payload = getPayloadFromStateRoute(actionStateRoute);

    console.log('payload', payload);
    console.log('actionStateRoute', actionStateRoute);
    console.log('stackState', stackState);
    const preloadedRoute = stackState.preloadedRoutes.find(
      (route) => route.name === actionStateRoute.name && deepEqual(route.params, payload.params)
    );
    return preloadedRoute;
  }

  return undefined;
}

function deepEqual(
  a: { [key: string]: any } | undefined,
  b: { [key: string]: any } | undefined
): boolean {
  console.log('deepEqual', a, b);
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }
  return (
    Object.keys(a).length === Object.keys(b).length &&
    Object.keys(a).every((key) => deepEqual(a[key], b[key]))
  );
}
