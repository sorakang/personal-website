module.exports = {
  '[project]/apps/frontend/main/utils/api.js [app-ssr] (ecmascript)': (
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
        getData: () => getData,
      });
      const getData = async () => {
        const res = await fetch(
          `${('TURBOPACK compile-time value', 'http://localhost:3000')}/items`
        );
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      };
    }
  },
  '[project]/apps/frontend/main/app/page.js [app-ssr] (ecmascript)': (
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
        default: () => Home,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_import__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)'
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_import__(
          '[project]/node_modules/next/image.js [app-ssr] (ecmascript)'
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_import__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$packages$2f$components$2f$TitleContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_import__(
          '[project]/apps/frontend/packages/components/TitleContext.jsx [app-ssr] (ecmascript)'
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$main$2f$utils$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_import__(
          '[project]/apps/frontend/main/utils/api.js [app-ssr] (ecmascript)'
        );
      ('use client');
      function Home() {
        const { setTitle } = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$packages$2f$components$2f$TitleContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'useTitle'
        ])();
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'useEffect'
        ])(() => {
          setTitle('');
        }, []);
        const [data, setData] = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'useState'
        ])('');
        console.log('data', data);
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          'div',
          {
            children: [
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'jsxDEV'
              ])(
                'div',
                {
                  className: 'construction',
                  children: [
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'default'
                      ],
                      {
                        'aria-hidden': true,
                        src: '/traffic.svg',
                        alt: 'Traffic Cone icon',
                        width: 30,
                        height: 30,
                      },
                      void 0,
                      false,
                      {
                        fileName: '[project]/apps/frontend/main/app/page.js',
                        lineNumber: 20,
                        columnNumber: 9,
                      },
                      this
                    ),
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'p',
                      {
                        className: 'title',
                        children: 'Under Construction',
                      },
                      void 0,
                      false,
                      {
                        fileName: '[project]/apps/frontend/main/app/page.js',
                        lineNumber: 27,
                        columnNumber: 9,
                      },
                      this
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName: '[project]/apps/frontend/main/app/page.js',
                  lineNumber: 19,
                  columnNumber: 7,
                },
                this
              ),
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'jsxDEV'
              ])(
                'p',
                {
                  children: 'Please come back soon!',
                },
                void 0,
                false,
                {
                  fileName: '[project]/apps/frontend/main/app/page.js',
                  lineNumber: 29,
                  columnNumber: 7,
                },
                this
              ),
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'jsxDEV'
              ])(
                'p',
                {
                  children: ['API Message: ', data],
                },
                void 0,
                true,
                {
                  fileName: '[project]/apps/frontend/main/app/page.js',
                  lineNumber: 30,
                  columnNumber: 7,
                },
                this
              ),
            ],
          },
          void 0,
          true,
          {
            fileName: '[project]/apps/frontend/main/app/page.js',
            lineNumber: 18,
            columnNumber: 5,
          },
          this
        );
      }
    }
  },
  '[project]/apps/frontend/main/app/page.js [app-rsc] (ecmascript, Next.js server component, client modules ssr)':
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

//# sourceMappingURL=%5Bproject%5D_apps_frontend_main_e697b9._.js.map
