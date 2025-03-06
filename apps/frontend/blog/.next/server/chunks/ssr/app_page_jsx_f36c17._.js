module.exports = {
  '[project]/apps/frontend/blog/app/page.jsx [app-ssr] (ecmascript)': (
    __turbopack_context__
  ) => {
    'use strict';

    var {
      r: __turbopack_require__,
      f: __turbopack_module_context__,
      i: __turbopack_import__,
      s: __turbopack_esm__,
      v: __turbopack_export_value__,
      n: __turbopack_export_namespace__,
      c: __turbopack_cache__,
      M: __turbopack_modules__,
      l: __turbopack_load__,
      j: __turbopack_dynamic__,
      P: __turbopack_resolve_absolute_path__,
      U: __turbopack_relative_url__,
      R: __turbopack_resolve_module_id_path__,
      b: __turbopack_worker_blob_url__,
      g: global,
      __dirname,
      x: __turbopack_external_require__,
      y: __turbopack_external_import__,
      z: __turbopack_require_stub__,
    } = __turbopack_context__;
    {
      __turbopack_esm__({
        default: () => Blog,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_import__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)'
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_import__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$packages$2f$components$2f$TitleContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_import__(
          '[project]/apps/frontend/packages/components/TitleContext.jsx [app-ssr] (ecmascript)'
        );
      ('use client');
      // import getPosts from '../api/getPosts.js'
      async function getPosts() {
        const [posts, setPosts] = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'useState'
        ])();
        try {
          const repsonse = await fetch(
            ('TURBOPACK compile-time value',
            'https://fake-json-api.mock.beeceptor.com/users')
          );
          const result = await repsonse.json();
          console.log('result', result);
          setPosts(result);
          console.log('posts', posts);
        } catch (e) {
          console.error(e);
        }
      }
      function Blog() {
        const { setTitle } = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$packages$2f$components$2f$TitleContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'useTitle'
        ])();
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'useEffect'
        ])(() => {
          setTitle('My Blog');
        }, []);
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          'div',
          {
            children: /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'p',
              {
                children: 'Under Construction',
              },
              void 0,
              false,
              {
                fileName: '[project]/apps/frontend/blog/app/page.jsx',
                lineNumber: 27,
                columnNumber: 7,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: '[project]/apps/frontend/blog/app/page.jsx',
            lineNumber: 26,
            columnNumber: 5,
          },
          this
        );
      }
    }
  },
  '[project]/apps/frontend/blog/app/page.jsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)':
    (__turbopack_context__) => {
      var {
        r: __turbopack_require__,
        f: __turbopack_module_context__,
        i: __turbopack_import__,
        s: __turbopack_esm__,
        v: __turbopack_export_value__,
        n: __turbopack_export_namespace__,
        c: __turbopack_cache__,
        M: __turbopack_modules__,
        l: __turbopack_load__,
        j: __turbopack_dynamic__,
        P: __turbopack_resolve_absolute_path__,
        U: __turbopack_relative_url__,
        R: __turbopack_resolve_module_id_path__,
        b: __turbopack_worker_blob_url__,
        g: global,
        __dirname,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
      }
    },
};

//# sourceMappingURL=app_page_jsx_f36c17._.js.map
