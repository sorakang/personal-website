module.exports = {
  '[project]/node_modules/@react-pdf-viewer/attachment/lib/cjs/attachment.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/attachment/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        var getFileName = function (url) {
          var str = url.split('/').pop();
          return str ? str.split('#')[0].split('?')[0] : url;
        };
        var downloadFile = function (url, data) {
          var blobUrl =
            typeof data === 'string'
              ? ''
              : URL.createObjectURL(
                  new Blob([data], {
                    type: '',
                  })
                );
          var link = document.createElement('a');
          link.style.display = 'none';
          link.href = blobUrl || url;
          link.setAttribute('download', getFileName(url));
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          if (blobUrl) {
            URL.revokeObjectURL(blobUrl);
          }
        };
        var AttachmentList = function (_a) {
          var files = _a.files;
          var containerRef = React__namespace.useRef();
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var direction = React__namespace.useContext(
            core.ThemeContext
          ).direction;
          var isRtl = direction === core.TextDirection.RightToLeft;
          var attachmentItemsRef = React__namespace.useRef([]);
          var clickDownloadLabel =
            l10n && l10n.attachment
              ? l10n.attachment.clickToDownload
              : 'Click to download';
          var handleKeyDown = function (e) {
            switch (e.key) {
              case 'ArrowDown':
                e.preventDefault();
                moveToItem(function (items, activeEle) {
                  return items.indexOf(activeEle) + 1;
                });
                break;
              case 'ArrowUp':
                e.preventDefault();
                moveToItem(function (items, activeEle) {
                  return items.indexOf(activeEle) - 1;
                });
                break;
              case 'End':
                e.preventDefault();
                moveToItem(function (items, _) {
                  return items.length - 1;
                });
                break;
              case 'Home':
                e.preventDefault();
                moveToItem(function (_, __) {
                  return 0;
                });
                break;
            }
          };
          var moveToItem = function (getItemIndex) {
            var container = containerRef.current;
            var attachmentItems = [].slice.call(
              container.getElementsByClassName('rpv-attachment__item')
            );
            if (attachmentItems.length === 0) {
              return;
            }
            attachmentItems.forEach(function (item) {
              return item.setAttribute('tabindex', '-1');
            });
            var activeEle = document.activeElement;
            var targetIndex = Math.min(
              attachmentItems.length - 1,
              Math.max(0, getItemIndex(attachmentItems, activeEle))
            );
            var targetEle = attachmentItems[targetIndex];
            targetEle.setAttribute('tabindex', '0');
            targetEle.focus();
          };
          core.useIsomorphicLayoutEffect(function () {
            var container = containerRef.current;
            if (!container) {
              return;
            }
            var attachmentItems = [].slice.call(
              container.getElementsByClassName('rpv-attachment__item')
            );
            attachmentItemsRef.current = attachmentItems;
            if (attachmentItems.length > 0) {
              var firstItem = attachmentItems[0];
              firstItem.focus();
              firstItem.setAttribute('tabindex', '0');
            }
          }, []);
          return React__namespace.createElement(
            'div',
            {
              'data-testid': 'attachment__list',
              className: core.classNames({
                'rpv-attachment__list': true,
                'rpv-attachment__list--rtl': isRtl,
              }),
              ref: containerRef,
              tabIndex: -1,
              onKeyDown: handleKeyDown,
            },
            files.map(function (file) {
              return React__namespace.createElement(
                'button',
                {
                  className: 'rpv-attachment__item',
                  key: file.fileName,
                  tabIndex: -1,
                  title: clickDownloadLabel,
                  type: 'button',
                  onClick: function () {
                    return downloadFile(file.fileName, file.data);
                  },
                },
                file.fileName
              );
            })
          );
        };
        var AttachmentLoader = function (_a) {
          var doc = _a.doc;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var direction = React__namespace.useContext(
            core.ThemeContext
          ).direction;
          var isRtl = direction === core.TextDirection.RightToLeft;
          var noAttachmentLabel =
            l10n && l10n.attachment
              ? l10n.attachment.noAttachment
              : 'There is no attachment';
          var _b = React__namespace.useState({
              files: [],
              isLoaded: false,
            }),
            attachments = _b[0],
            setAttachments = _b[1];
          React__namespace.useEffect(
            function () {
              doc.getAttachments().then(function (response) {
                var files = response
                  ? Object.keys(response).map(function (file) {
                      return {
                        data: response[file].content,
                        fileName: response[file].filename,
                      };
                    })
                  : [];
                setAttachments({
                  files: files,
                  isLoaded: true,
                });
              });
            },
            [doc]
          );
          return !attachments.isLoaded
            ? React__namespace.createElement(core.Spinner, null)
            : attachments.files.length === 0
              ? React__namespace.createElement(
                  'div',
                  {
                    'data-testid': 'attachment__empty',
                    className: core.classNames({
                      'rpv-attachment__empty': true,
                      'rpv-attachment__empty--rtl': isRtl,
                    }),
                  },
                  noAttachmentLabel
                )
              : React__namespace.createElement(AttachmentList, {
                  files: attachments.files,
                });
        };
        var AttachmentListWithStore = function (_a) {
          var store = _a.store;
          var _b = React__namespace.useState(store.get('doc')),
            currentDoc = _b[0],
            setCurrentDoc = _b[1];
          var handleDocumentChanged = function (doc) {
            setCurrentDoc(doc);
          };
          React__namespace.useEffect(function () {
            store.subscribe('doc', handleDocumentChanged);
            return function () {
              store.unsubscribe('doc', handleDocumentChanged);
            };
          }, []);
          return currentDoc
            ? React__namespace.createElement(AttachmentLoader, {
                doc: currentDoc,
              })
            : React__namespace.createElement(
                'div',
                {
                  className: 'rpv-attachment__loader',
                },
                React__namespace.createElement(core.Spinner, null)
              );
        };
        var attachmentPlugin = function () {
          var store = React__namespace.useMemo(function () {
            return core.createStore({});
          }, []);
          var AttachmentsDecorator = function () {
            return React__namespace.createElement(AttachmentListWithStore, {
              store: store,
            });
          };
          return {
            onDocumentLoad: function (props) {
              store.update('doc', props.doc);
            },
            Attachments: AttachmentsDecorator,
          };
        };
        exports.attachmentPlugin = attachmentPlugin;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/attachment/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/attachment/lib/cjs/attachment.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
  '[project]/node_modules/@react-pdf-viewer/bookmark/lib/cjs/bookmark.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/bookmark/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign =
          function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var DownArrowIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M6.427,8.245A.5.5,0,0,1,6.862,7.5H17.138a.5.5,0,0,1,.435.749l-5.139,9a.5.5,0,0,1-.868,0Z',
            })
          );
        };
        var RightArrowIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M9.248,17.572a.5.5,0,0,1-.748-.434V6.862a.5.5,0,0,1,.748-.434l8.992,5.138a.5.5,0,0,1,0,.868Z',
            })
          );
        };
        var shouldBeCollapsed = function (bookmark) {
          var count = bookmark.count,
            items = bookmark.items;
          if (count >= 0) {
            return false;
          }
          var numSubItems = items.length;
          if (numSubItems === 0) {
            return false;
          }
          var subItems = items.concat([]);
          while (subItems.length > 0) {
            var firstChild = subItems.shift();
            var children = firstChild.items;
            if (
              firstChild.count &&
              children &&
              firstChild.count > 0 &&
              children.length > 0
            ) {
              numSubItems += children.length;
              subItems = subItems.concat(children);
            }
          }
          return Math.abs(count) === numSubItems;
        };
        var BookmarkItem = function (_a) {
          var bookmark = _a.bookmark,
            depth = _a.depth,
            doc = _a.doc,
            index = _a.index,
            isBookmarkExpanded = _a.isBookmarkExpanded,
            numberOfSiblings = _a.numberOfSiblings,
            pathFromRoot = _a.pathFromRoot,
            renderBookmarkItem = _a.renderBookmarkItem,
            store = _a.store;
          var path = pathFromRoot
            ? ''.concat(pathFromRoot, '.').concat(index)
            : ''.concat(index);
          var defaultIsCollapsed = React__namespace.useMemo(
            function () {
              return shouldBeCollapsed(bookmark);
            },
            [bookmark]
          );
          var bookmarkExpandedMap = store.get('bookmarkExpandedMap');
          var defaultExpanded = isBookmarkExpanded
            ? isBookmarkExpanded({
                bookmark: bookmark,
                doc: doc,
                depth: depth,
                index: index,
              })
            : bookmarkExpandedMap.has(path)
              ? bookmarkExpandedMap.get(path)
              : !defaultIsCollapsed;
          var _b = React__namespace.useState(defaultExpanded),
            expanded = _b[0],
            setExpanded = _b[1];
          var hasSubItems = bookmark.items && bookmark.items.length > 0;
          var toggleSubItems = function () {
            var newState = !expanded;
            store.updateCurrentValue(
              'bookmarkExpandedMap',
              function (currentValue) {
                return currentValue.set(path, newState);
              }
            );
            setExpanded(newState);
          };
          var jumpToDest = function () {
            var dest = bookmark.dest;
            var jumpToDestination = store.get('jumpToDestination');
            core.getDestination(doc, dest).then(function (target) {
              if (jumpToDestination) {
                jumpToDestination(
                  __assign(
                    {
                      label: bookmark.title,
                    },
                    target
                  )
                );
              }
            });
          };
          var clickBookmark = function () {
            if (hasSubItems && bookmark.dest) {
              jumpToDest();
            }
          };
          var clickItem = function () {
            if (!hasSubItems && bookmark.dest) {
              jumpToDest();
            }
          };
          var defaultRenderItem = function (onClickItem, children) {
            return React__namespace.createElement(
              'div',
              {
                className: 'rpv-bookmark__item',
                style: {
                  paddingLeft: ''.concat(depth * 1.25, 'rem'),
                },
                onClick: onClickItem,
              },
              children
            );
          };
          var defaultRenderToggle = function (expandIcon, collapseIcon) {
            return hasSubItems
              ? React__namespace.createElement(
                  'span',
                  {
                    className: 'rpv-bookmark__toggle',
                    'data-testid': 'bookmark__toggle-'
                      .concat(depth, '-')
                      .concat(index),
                    onClick: toggleSubItems,
                  },
                  expanded ? expandIcon : collapseIcon
                )
              : React__namespace.createElement('span', {
                  className: 'rpv-bookmark__toggle',
                });
          };
          var defaultRenderTitle = function (onClickBookmark) {
            return bookmark.url
              ? React__namespace.createElement(
                  'a',
                  {
                    className: 'rpv-bookmark__title',
                    href: bookmark.url,
                    rel: 'noopener noreferrer nofollow',
                    target: bookmark.newWindow ? '_blank' : '',
                  },
                  bookmark.title
                )
              : React__namespace.createElement(
                  'div',
                  {
                    className: 'rpv-bookmark__title',
                    'aria-label': bookmark.title,
                    onClick: onClickBookmark,
                  },
                  bookmark.title
                );
          };
          return React__namespace.createElement(
            'li',
            {
              'aria-expanded': expanded ? 'true' : 'false',
              'aria-label': bookmark.title,
              'aria-level': depth + 1,
              'aria-posinset': index + 1,
              'aria-setsize': numberOfSiblings,
              role: 'treeitem',
              tabIndex: -1,
            },
            renderBookmarkItem
              ? renderBookmarkItem({
                  bookmark: bookmark,
                  depth: depth,
                  hasSubItems: hasSubItems,
                  index: index,
                  isExpanded: expanded,
                  path: path,
                  defaultRenderItem: defaultRenderItem,
                  defaultRenderTitle: defaultRenderTitle,
                  defaultRenderToggle: defaultRenderToggle,
                  onClickItem: clickItem,
                  onClickTitle: clickBookmark,
                  onToggleSubItems: toggleSubItems,
                })
              : defaultRenderItem(
                  clickItem,
                  React__namespace.createElement(
                    React__namespace.Fragment,
                    null,
                    defaultRenderToggle(
                      React__namespace.createElement(DownArrowIcon, null),
                      React__namespace.createElement(RightArrowIcon, null)
                    ),
                    defaultRenderTitle(clickBookmark)
                  )
                ),
            hasSubItems &&
              expanded &&
              React__namespace.createElement(BookmarkList, {
                bookmarks: bookmark.items,
                depth: depth + 1,
                doc: doc,
                isBookmarkExpanded: isBookmarkExpanded,
                isRoot: false,
                pathFromRoot: path,
                renderBookmarkItem: renderBookmarkItem,
                store: store,
              })
          );
        };
        var BookmarkList = function (_a) {
          var bookmarks = _a.bookmarks,
            _b = _a.depth,
            depth = _b === void 0 ? 0 : _b,
            doc = _a.doc,
            isBookmarkExpanded = _a.isBookmarkExpanded,
            isRoot = _a.isRoot,
            pathFromRoot = _a.pathFromRoot,
            renderBookmarkItem = _a.renderBookmarkItem,
            store = _a.store;
          return React__namespace.createElement(
            'ul',
            {
              className: 'rpv-bookmark__list',
              role: isRoot ? 'tree' : 'group',
              tabIndex: -1,
            },
            bookmarks.map(function (bookmark, index) {
              return React__namespace.createElement(BookmarkItem, {
                bookmark: bookmark,
                depth: depth,
                doc: doc,
                index: index,
                isBookmarkExpanded: isBookmarkExpanded,
                key: index,
                numberOfSiblings: bookmarks.length,
                pathFromRoot: pathFromRoot,
                renderBookmarkItem: renderBookmarkItem,
                store: store,
              });
            })
          );
        };
        var Toggle;
        (function (Toggle) {
          Toggle[(Toggle['Collapse'] = 0)] = 'Collapse';
          Toggle[(Toggle['Expand'] = 1)] = 'Expand';
        })(Toggle || (Toggle = {}));
        var BookmarkListRoot = function (_a) {
          var bookmarks = _a.bookmarks,
            doc = _a.doc,
            isBookmarkExpanded = _a.isBookmarkExpanded,
            renderBookmarkItem = _a.renderBookmarkItem,
            store = _a.store;
          var containerRef = React__namespace.useRef();
          var handleKeyDown = function (e) {
            var container = containerRef.current;
            if (
              !container ||
              !(e.target instanceof HTMLElement) ||
              !container.contains(e.target)
            ) {
              return;
            }
            switch (e.key) {
              case 'ArrowDown':
                e.preventDefault();
                moveToItem(function (bookmarkElements, activeEle) {
                  return bookmarkElements.indexOf(activeEle) + 1;
                });
                break;
              case 'ArrowLeft':
                e.preventDefault();
                toggle(Toggle.Collapse);
                break;
              case 'ArrowRight':
                e.preventDefault();
                toggle(Toggle.Expand);
                break;
              case 'ArrowUp':
                e.preventDefault;
                moveToItem(function (bookmarkElements, activeEle) {
                  return bookmarkElements.indexOf(activeEle) - 1;
                });
                break;
              case 'End':
                e.preventDefault();
                moveToItem(function (bookmarkElements, _) {
                  return bookmarkElements.length - 1;
                });
                break;
              case ' ':
              case 'Enter':
              case 'Space':
                e.preventDefault();
                clickBookmark();
                break;
              case 'Home':
                e.preventDefault();
                moveToItem(function (_, __) {
                  return 0;
                });
                break;
            }
          };
          var clickBookmark = function () {
            var closestItem = document.activeElement.closest(
              '.rpv-bookmark__item'
            );
            var titleEle = closestItem.querySelector('.rpv-bookmark__title');
            if (titleEle) {
              titleEle.click();
            }
          };
          var moveToItem = function (getItemIndex) {
            var container = containerRef.current;
            var bookmarkElements = [].slice.call(
              container.getElementsByClassName('rpv-bookmark__item')
            );
            if (bookmarkElements.length === 0) {
              return;
            }
            var activeEle = document.activeElement;
            var targetIndex = Math.min(
              bookmarkElements.length - 1,
              Math.max(0, getItemIndex(bookmarkElements, activeEle))
            );
            var targetEle = bookmarkElements[targetIndex];
            activeEle.setAttribute('tabindex', '-1');
            targetEle.setAttribute('tabindex', '0');
            targetEle.focus();
          };
          var toggle = function (toggle) {
            var container = containerRef.current;
            var bookmarkElements = [].slice.call(
              container.getElementsByClassName('rpv-bookmark__item')
            );
            if (bookmarkElements.length === 0) {
              return;
            }
            var closestItem = document.activeElement.closest(
              '.rpv-bookmark__item'
            );
            var expanedAttribute =
              toggle === Toggle.Collapse ? 'true' : 'false';
            if (
              closestItem &&
              closestItem.parentElement.getAttribute('aria-expanded') ===
                expanedAttribute
            ) {
              var toggleEle = closestItem.querySelector(
                '.rpv-bookmark__toggle'
              );
              if (toggleEle) {
                toggleEle.click();
              }
            }
          };
          React__namespace.useEffect(function () {
            document.addEventListener('keydown', handleKeyDown);
            return function () {
              document.removeEventListener('keydown', handleKeyDown);
            };
          }, []);
          React__namespace.useEffect(function () {
            var container = containerRef.current;
            if (!container) {
              return;
            }
            var bookmarkElements = [].slice.call(
              container.getElementsByClassName('rpv-bookmark__item')
            );
            if (bookmarkElements.length > 0) {
              bookmarkElements[0].focus();
              bookmarkElements[0].setAttribute('tabindex', '0');
            }
          }, []);
          return React__namespace.createElement(
            'div',
            {
              ref: containerRef,
            },
            React__namespace.createElement(BookmarkList, {
              bookmarks: bookmarks,
              depth: 0,
              doc: doc,
              isBookmarkExpanded: isBookmarkExpanded,
              isRoot: true,
              pathFromRoot: '',
              renderBookmarkItem: renderBookmarkItem,
              store: store,
            })
          );
        };
        var BookmarkLoader = function (_a) {
          var doc = _a.doc,
            isBookmarkExpanded = _a.isBookmarkExpanded,
            renderBookmarkItem = _a.renderBookmarkItem,
            store = _a.store;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var direction = React__namespace.useContext(
            core.ThemeContext
          ).direction;
          var isRtl = direction === core.TextDirection.RightToLeft;
          var _b = React__namespace.useState({
              isLoaded: false,
              items: [],
            }),
            bookmarks = _b[0],
            setBookmarks = _b[1];
          React__namespace.useEffect(
            function () {
              setBookmarks({
                isLoaded: false,
                items: [],
              });
              doc.getOutline().then(function (outline) {
                setBookmarks({
                  isLoaded: true,
                  items: outline || [],
                });
              });
            },
            [doc]
          );
          return !bookmarks.isLoaded
            ? React__namespace.createElement(
                'div',
                {
                  className: 'rpv-bookmark__loader',
                },
                React__namespace.createElement(core.Spinner, null)
              )
            : bookmarks.items.length === 0
              ? React__namespace.createElement(
                  'div',
                  {
                    'data-testid': 'bookmark__empty',
                    className: core.classNames({
                      'rpv-bookmark__empty': true,
                      'rpv-bookmark__empty--rtl': isRtl,
                    }),
                  },
                  l10n && l10n.bookmark
                    ? l10n.bookmark.noBookmark
                    : 'There is no bookmark'
                )
              : React__namespace.createElement(
                  'div',
                  {
                    'data-testid': 'bookmark__container',
                    className: core.classNames({
                      'rpv-bookmark__container': true,
                      'rpv-bookmark__container--rtl': isRtl,
                    }),
                  },
                  React__namespace.createElement(BookmarkListRoot, {
                    bookmarks: bookmarks.items,
                    doc: doc,
                    isBookmarkExpanded: isBookmarkExpanded,
                    renderBookmarkItem: renderBookmarkItem,
                    store: store,
                  })
                );
        };
        var BookmarkListWithStore = function (_a) {
          var isBookmarkExpanded = _a.isBookmarkExpanded,
            renderBookmarkItem = _a.renderBookmarkItem,
            store = _a.store;
          var _b = React__namespace.useState(store.get('doc')),
            currentDoc = _b[0],
            setCurrentDoc = _b[1];
          var handleDocumentChanged = function (doc) {
            setCurrentDoc(doc);
          };
          React__namespace.useEffect(function () {
            store.subscribe('doc', handleDocumentChanged);
            return function () {
              store.unsubscribe('doc', handleDocumentChanged);
            };
          }, []);
          return currentDoc
            ? React__namespace.createElement(BookmarkLoader, {
                doc: currentDoc,
                isBookmarkExpanded: isBookmarkExpanded,
                renderBookmarkItem: renderBookmarkItem,
                store: store,
              })
            : React__namespace.createElement(
                'div',
                {
                  className: 'rpv-bookmark__loader',
                },
                React__namespace.createElement(core.Spinner, null)
              );
        };
        var bookmarkPlugin = function () {
          var store = React__namespace.useMemo(function () {
            return core.createStore({
              bookmarkExpandedMap: new Map(),
            });
          }, []);
          var BookmarksDecorator = function (props) {
            return React__namespace.createElement(BookmarkListWithStore, {
              isBookmarkExpanded:
                props === null || props === void 0
                  ? void 0
                  : props.isBookmarkExpanded,
              renderBookmarkItem:
                props === null || props === void 0
                  ? void 0
                  : props.renderBookmarkItem,
              store: store,
            });
          };
          return {
            install: function (pluginFunctions) {
              store.update(
                'jumpToDestination',
                pluginFunctions.jumpToDestination
              );
            },
            onDocumentLoad: function (props) {
              store.update('doc', props.doc);
            },
            Bookmarks: BookmarksDecorator,
          };
        };
        exports.DownArrowIcon = DownArrowIcon;
        exports.RightArrowIcon = RightArrowIcon;
        exports.bookmarkPlugin = bookmarkPlugin;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/bookmark/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/bookmark/lib/cjs/bookmark.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
  '[project]/node_modules/@react-pdf-viewer/thumbnail/lib/cjs/thumbnail.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/thumbnail/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        exports.ThumbnailDirection = void 0;
        (function (ThumbnailDirection) {
          ThumbnailDirection['Horizontal'] = 'Horizontal';
          ThumbnailDirection['Vertical'] = 'Vertical';
        })(exports.ThumbnailDirection || (exports.ThumbnailDirection = {}));
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign =
          function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var CoverInner = function (_a) {
          var doc = _a.doc,
            getPageIndex = _a.getPageIndex,
            renderSpinner = _a.renderSpinner,
            store = _a.store,
            width = _a.width;
          var numPages = doc.numPages;
          var targetPage = getPageIndex
            ? getPageIndex({
                numPages: numPages,
              })
            : 0;
          var normalizePage = Math.max(0, Math.min(targetPage, numPages - 1));
          var initialPagesRotation = store.get('pagesRotation') || new Map();
          var initialTargetPageRotation = initialPagesRotation.has(
            normalizePage
          )
            ? initialPagesRotation.get(normalizePage)
            : 0;
          var _b = React__namespace.useState(''),
            src = _b[0],
            setSrc = _b[1];
          var isMounted = core.useIsMounted();
          var renderTask = React__namespace.useRef();
          var _c = React__namespace.useState(store.get('rotation') || 0),
            rotation = _c[0],
            setRotation = _c[1];
          var _d = React__namespace.useState(initialTargetPageRotation),
            pageRotation = _d[0],
            setPageRotation = _d[1];
          var _e = React__namespace.useState(false),
            isVisible = _e[0],
            setVisible = _e[1];
          var handlePagesRotationChanged = function (rotations) {
            var pageRotation = rotations.has(normalizePage)
              ? rotations.get(normalizePage)
              : 0;
            setPageRotation(pageRotation);
          };
          var handleRotationChanged = function (currentRotation) {
            setRotation(currentRotation);
          };
          var handleVisibilityChanged = function (params) {
            setVisible(params.isVisible);
          };
          var containerRef = core.useIntersectionObserver({
            onVisibilityChanged: handleVisibilityChanged,
          });
          React__namespace.useEffect(
            function () {
              if (!isVisible) {
                return;
              }
              var containerEle = containerRef.current;
              if (!containerEle) {
                return;
              }
              setSrc('');
              core.getPage(doc, normalizePage).then(function (page) {
                var viewport = page.getViewport({
                  scale: 1,
                });
                var viewportRotation = viewport.rotation;
                var rotationValue =
                  (viewportRotation + rotation + pageRotation) % 360;
                var isVertical = Math.abs(rotation + pageRotation) % 180 === 0;
                var w = isVertical ? viewport.width : viewport.height;
                var h = isVertical ? viewport.height : viewport.width;
                var canvas = document.createElement('canvas');
                var canvasContext = canvas.getContext('2d', {
                  alpha: false,
                });
                var containerWidth = containerEle.clientWidth;
                var containerHeight = containerEle.clientHeight;
                var scaled = width
                  ? width / w
                  : Math.min(containerWidth / w, containerHeight / h);
                var canvasWidth = scaled * w;
                var canvasHeight = scaled * h;
                canvas.height = canvasHeight;
                canvas.width = canvasWidth;
                canvas.style.opacity = '0';
                var renderViewport = page.getViewport({
                  rotation: rotationValue,
                  scale: scaled,
                });
                renderTask.current = page.render({
                  canvasContext: canvasContext,
                  viewport: renderViewport,
                });
                renderTask.current.promise.then(
                  function () {
                    isMounted.current && setSrc(canvas.toDataURL());
                    canvas.width = 0;
                    canvas.height = 0;
                  },
                  function () {}
                );
              });
            },
            [pageRotation, isVisible]
          );
          React__namespace.useEffect(function () {
            store.subscribe('pagesRotation', handlePagesRotationChanged);
            store.subscribe('rotation', handleRotationChanged);
            return function () {
              store.unsubscribe('pagesRotation', handlePagesRotationChanged);
              store.unsubscribe('rotation', handleRotationChanged);
            };
          }, []);
          React__namespace.useEffect(function () {
            return function () {
              var _a;
              (_a = renderTask.current) === null || _a === void 0
                ? void 0
                : _a.cancel();
            };
          }, []);
          return React__namespace.createElement(
            'div',
            {
              ref: containerRef,
              className: 'rpv-thumbnail__cover-inner',
              'data-testid': 'thumbnail__cover-inner',
            },
            src
              ? React__namespace.createElement('img', {
                  className: 'rpv-thumbnail__cover-image',
                  'data-testid': 'thumbnail__cover-image',
                  src: src,
                })
              : React__namespace.createElement(
                  'div',
                  {
                    className: 'rpv-thumbnail__cover-loader',
                    'data-testid': 'thumbnail__cover-loader',
                  },
                  renderSpinner
                    ? renderSpinner()
                    : React__namespace.createElement(core.Spinner, null)
                )
          );
        };
        var Cover = function (_a) {
          var getPageIndex = _a.getPageIndex,
            renderSpinner = _a.renderSpinner,
            store = _a.store,
            width = _a.width;
          var _b = React__namespace.useState(store.get('doc')),
            currentDoc = _b[0],
            setCurrentDoc = _b[1];
          var handleDocumentChanged = function (doc) {
            setCurrentDoc(doc);
          };
          React__namespace.useEffect(function () {
            store.subscribe('doc', handleDocumentChanged);
            return function () {
              store.unsubscribe('doc', handleDocumentChanged);
            };
          }, []);
          return React__namespace.createElement(
            'div',
            {
              className: 'rpv-thumbnail__cover',
            },
            currentDoc
              ? React__namespace.createElement(CoverInner, {
                  doc: currentDoc,
                  getPageIndex: getPageIndex,
                  renderSpinner: renderSpinner,
                  store: store,
                  width: width,
                })
              : React__namespace.createElement(
                  'div',
                  {
                    className: 'rpv-thumbnail__cover-loader',
                  },
                  renderSpinner
                    ? renderSpinner()
                    : React__namespace.createElement(core.Spinner, null)
                )
          );
        };
        var defaultSpinner = function () {
          return React__namespace.createElement(core.Spinner, null);
        };
        var SpinnerContext = React__namespace.createContext({
          renderSpinner: defaultSpinner,
        });
        var FetchLabels = function (_a) {
          var children = _a.children,
            doc = _a.doc;
          var isMounted = core.useIsMounted();
          var _b = React__namespace.useState({
              loading: true,
              labels: [],
            }),
            status = _b[0],
            setStatus = _b[1];
          React__namespace.useEffect(
            function () {
              doc.getPageLabels().then(function (result) {
                isMounted.current &&
                  setStatus({
                    loading: false,
                    labels: result || [],
                  });
              });
            },
            [doc.loadingTask.docId]
          );
          return status.loading
            ? React__namespace.createElement(React__namespace.Fragment, null)
            : children(status.labels);
        };
        var scrollToBeVisibleVertically = function (ele, container) {
          var top =
            ele.getBoundingClientRect().top -
            container.getBoundingClientRect().top;
          var eleHeight = ele.clientHeight;
          var containerHeight = container.clientHeight;
          if (top < 0) {
            container.scrollTop += top;
            return;
          }
          if (top + eleHeight <= containerHeight) {
            return;
          }
          container.scrollTop += top + eleHeight - containerHeight;
        };
        var scrollToBeVisibleHorizontally = function (ele, container) {
          var left =
            ele.getBoundingClientRect().left -
            container.getBoundingClientRect().left;
          var eleWidth = ele.clientWidth;
          var containerWidth = container.clientWidth;
          if (left < 0) {
            container.scrollLeft += left;
            return;
          }
          if (left + eleWidth <= containerWidth) {
            return;
          }
          container.scrollLeft += left + eleWidth - containerWidth;
        };
        var ThumbnailItem = function (_a) {
          var page = _a.page,
            pageHeight = _a.pageHeight,
            pageIndex = _a.pageIndex,
            pageWidth = _a.pageWidth,
            rotation = _a.rotation,
            thumbnailHeight = _a.thumbnailHeight,
            thumbnailWidth = _a.thumbnailWidth,
            onRenderCompleted = _a.onRenderCompleted;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var renderTask = React__namespace.useRef();
          var _b = React__namespace.useState(''),
            src = _b[0],
            setSrc = _b[1];
          var thumbnailLabel =
            l10n && l10n.thumbnail
              ? l10n.thumbnail.thumbnailLabel
              : 'Thumbnail of page {{pageIndex}}';
          React__namespace.useEffect(
            function () {
              var task = renderTask.current;
              if (task) {
                task.cancel();
              }
              var canvas = document.createElement('canvas');
              var canvasContext = canvas.getContext('2d', {
                alpha: false,
              });
              var w = thumbnailWidth;
              var h = w / (pageWidth / pageHeight);
              var scale = w / pageWidth;
              canvas.height = h;
              canvas.width = w;
              canvas.style.height = ''.concat(h, 'px');
              canvas.style.width = ''.concat(w, 'px');
              var viewport = page.getViewport({
                rotation: rotation,
                scale: scale,
              });
              renderTask.current = page.render({
                canvasContext: canvasContext,
                viewport: viewport,
              });
              renderTask.current.promise.then(
                function () {
                  setSrc(canvas.toDataURL());
                  onRenderCompleted(pageIndex);
                },
                function () {
                  onRenderCompleted(pageIndex);
                }
              );
              return function () {
                var _a;
                (_a = renderTask.current) === null || _a === void 0
                  ? void 0
                  : _a.cancel();
              };
            },
            [rotation]
          );
          return !src
            ? React__namespace.useContext(SpinnerContext).renderSpinner()
            : React__namespace.createElement('img', {
                'aria-label': thumbnailLabel.replace(
                  '{{pageIndex}}',
                  ''.concat(pageIndex + 1)
                ),
                src: src,
                height: ''.concat(thumbnailHeight, 'px'),
                width: ''.concat(thumbnailWidth, 'px'),
              });
        };
        var ThumbnailContainer = function (_a) {
          var doc = _a.doc,
            pageHeight = _a.pageHeight,
            pageIndex = _a.pageIndex,
            pageRotation = _a.pageRotation,
            pageWidth = _a.pageWidth,
            rotation = _a.rotation,
            shouldRender = _a.shouldRender,
            thumbnailWidth = _a.thumbnailWidth,
            onRenderCompleted = _a.onRenderCompleted,
            onVisibilityChanged = _a.onVisibilityChanged;
          var isMounted = core.useIsMounted();
          var _b = React__namespace.useState({
              height: pageHeight,
              page: null,
              viewportRotation: 0,
              width: pageWidth,
            }),
            pageSize = _b[0],
            setPageSize = _b[1];
          var page = pageSize.page,
            height = pageSize.height,
            width = pageSize.width;
          var scale = width / height;
          var isVertical = Math.abs(rotation + pageRotation) % 180 === 0;
          var w = isVertical ? thumbnailWidth : thumbnailWidth / scale;
          var h = isVertical ? thumbnailWidth / scale : thumbnailWidth;
          React__namespace.useEffect(
            function () {
              if (shouldRender) {
                core.getPage(doc, pageIndex).then(function (pdfPage) {
                  var viewport = pdfPage.getViewport({
                    scale: 1,
                  });
                  isMounted.current &&
                    setPageSize({
                      height: viewport.height,
                      page: pdfPage,
                      viewportRotation: viewport.rotation,
                      width: viewport.width,
                    });
                });
              }
            },
            [shouldRender]
          );
          var rotationNumber =
            (pageSize.viewportRotation + rotation + pageRotation) % 360;
          var containerRef = core.useIntersectionObserver({
            onVisibilityChanged: function (visibility) {
              onVisibilityChanged(pageIndex, visibility);
            },
          });
          return React__namespace.createElement(
            'div',
            {
              className: 'rpv-thumbnail__container',
              'data-testid': 'thumbnail__container-'.concat(pageIndex),
              ref: containerRef,
              style: {
                height: ''.concat(h, 'px'),
                width: ''.concat(w, 'px'),
              },
            },
            !page
              ? React__namespace.useContext(SpinnerContext).renderSpinner()
              : React__namespace.createElement(ThumbnailItem, {
                  page: page,
                  pageHeight: isVertical ? height : width,
                  pageIndex: pageIndex,
                  pageWidth: isVertical ? width : height,
                  rotation: rotationNumber,
                  thumbnailHeight: h,
                  thumbnailWidth: w,
                  onRenderCompleted: onRenderCompleted,
                })
          );
        };
        var ThumbnailList = function (_a) {
          var currentPage = _a.currentPage,
            doc = _a.doc,
            labels = _a.labels,
            pagesRotation = _a.pagesRotation,
            pageHeight = _a.pageHeight,
            pageWidth = _a.pageWidth,
            renderCurrentPageLabel = _a.renderCurrentPageLabel,
            renderThumbnailItem = _a.renderThumbnailItem,
            rotatedPage = _a.rotatedPage,
            rotation = _a.rotation,
            thumbnailDirection = _a.thumbnailDirection,
            thumbnailWidth = _a.thumbnailWidth,
            viewMode = _a.viewMode,
            onJumpToPage = _a.onJumpToPage,
            onRotatePage = _a.onRotatePage;
          var numPages = doc.numPages;
          var docId = doc.loadingTask.docId;
          var containerRef = React__namespace.useRef(null);
          var thumbnailsRef = React__namespace.useRef([]);
          var _b = React__namespace.useState(currentPage),
            currentFocused = _b[0],
            setCurrentFocused = _b[1];
          var direction = React__namespace.useContext(
            core.ThemeContext
          ).direction;
          var isRtl = direction === core.TextDirection.RightToLeft;
          var _c = React__namespace.useState(-1),
            renderPageIndex = _c[0],
            setRenderPageIndex = _c[1];
          var isMounted = core.useIsMounted();
          var previousViewMode = core.usePrevious(viewMode);
          var hasRenderingThumbnailRef = React__namespace.useRef(false);
          var renderQueue = core.useRenderQueue({
            doc: doc,
          });
          var pageIndexes = React__namespace.useMemo(
            function () {
              return Array(numPages)
                .fill(0)
                .map(function (_, pageIndex) {
                  return pageIndex;
                });
            },
            [docId]
          );
          var chunks = React__namespace.useMemo(
            function () {
              switch (viewMode) {
                case core.ViewMode.DualPage:
                  return core.chunk(pageIndexes, 2);
                case core.ViewMode.DualPageWithCover:
                  return [[pageIndexes[0]]].concat(
                    core.chunk(pageIndexes.slice(1), 2)
                  );
                case core.ViewMode.SinglePage:
                default:
                  return core.chunk(pageIndexes, 1);
              }
            },
            [docId, viewMode]
          );
          var handleKeyDown = function (e) {
            switch (e.key) {
              case 'ArrowDown':
                activateNextItem();
                break;
              case 'ArrowUp':
                activatePreviousItem();
                break;
              case 'Enter':
                jumpToFocusedPage();
                break;
            }
          };
          var activateNextItem = function () {
            var container = containerRef.current;
            if (!container) {
              return;
            }
            var items = thumbnailsRef.current;
            var nextItem = currentFocused + 1;
            if (nextItem < items.length) {
              if (currentFocused >= 0) {
                items[currentFocused].setAttribute('tabindex', '-1');
              }
              setCurrentFocused(nextItem);
            }
          };
          var activatePreviousItem = function () {
            var container = containerRef.current;
            if (!container) {
              return;
            }
            var items = thumbnailsRef.current;
            var prevItem = currentFocused - 1;
            if (prevItem >= 0) {
              if (currentFocused >= 0) {
                items[currentFocused].setAttribute('tabindex', '-1');
              }
              setCurrentFocused(prevItem);
            }
          };
          var jumpToFocusedPage = function () {
            if (currentFocused >= 0 && currentFocused < numPages) {
              onJumpToPage(currentFocused);
            }
          };
          core.useIsomorphicLayoutEffect(
            function () {
              var container = containerRef.current;
              if (!container) {
                return;
              }
              thumbnailsRef.current = Array.from(
                container.querySelectorAll('.rpv-thumbnail__item')
              );
            },
            [viewMode]
          );
          React__namespace.useEffect(
            function () {
              var thumbnails = thumbnailsRef.current;
              if (
                thumbnails.length === 0 ||
                currentFocused < 0 ||
                currentFocused > thumbnails.length
              ) {
                return;
              }
              var thumbnailEle = thumbnails[currentFocused];
              thumbnailEle.setAttribute('tabindex', '0');
              thumbnailEle.focus();
            },
            [currentFocused]
          );
          core.useIsomorphicLayoutEffect(
            function () {
              var container = containerRef.current;
              var thumbnails = thumbnailsRef.current;
              if (
                !container ||
                thumbnails.length === 0 ||
                currentPage < 0 ||
                currentPage > thumbnails.length
              ) {
                return;
              }
              var thumbnailContainer = thumbnails[currentPage].closest(
                '.rpv-thumbnail__items'
              );
              if (thumbnailContainer) {
                thumbnailDirection === exports.ThumbnailDirection.Vertical
                  ? scrollToBeVisibleVertically(thumbnailContainer, container)
                  : scrollToBeVisibleHorizontally(
                      thumbnailContainer,
                      container
                    );
              }
            },
            [currentPage, thumbnailDirection]
          );
          var handleRenderCompleted = React__namespace.useCallback(
            function (pageIndex) {
              if (isMounted.current) {
                renderQueue.markRendered(pageIndex);
                hasRenderingThumbnailRef.current = false;
                renderNextThumbnail();
              }
            },
            [docId]
          );
          var handleVisibilityChanged = React__namespace.useCallback(
            function (pageIndex, visibility) {
              visibility.isVisible
                ? renderQueue.setVisibility(pageIndex, visibility.ratio)
                : renderQueue.setOutOfRange(pageIndex);
              renderNextThumbnail();
            },
            [docId]
          );
          var renderNextThumbnail = React__namespace.useCallback(
            function () {
              if (hasRenderingThumbnailRef.current) {
                return;
              }
              var nextPage = renderQueue.getHighestPriorityPage();
              if (nextPage > -1) {
                renderQueue.markRendering(nextPage);
                hasRenderingThumbnailRef.current = true;
                setRenderPageIndex(nextPage);
              }
            },
            [docId]
          );
          React__namespace.useEffect(
            function () {
              if (rotatedPage >= 0) {
                renderQueue.markRendering(rotatedPage);
                hasRenderingThumbnailRef.current = true;
                setRenderPageIndex(rotatedPage);
              }
            },
            [docId, rotatedPage]
          );
          core.useIsomorphicLayoutEffect(
            function () {
              if (previousViewMode !== viewMode) {
                renderQueue.markNotRendered();
                renderNextThumbnail();
              }
            },
            [viewMode]
          );
          var renderPageThumbnail = function (pageIndex) {
            var isCover =
              viewMode === core.ViewMode.DualPageWithCover &&
              (pageIndex === 0 ||
                (numPages % 2 === 0 && pageIndex === numPages - 1));
            var key = ''.concat(doc.loadingTask.docId, '___').concat(pageIndex);
            var pageLabel =
              labels.length === numPages
                ? labels[pageIndex]
                : ''.concat(pageIndex + 1);
            var label = renderCurrentPageLabel
              ? renderCurrentPageLabel({
                  currentPage: currentPage,
                  pageIndex: pageIndex,
                  numPages: numPages,
                  pageLabel: pageLabel,
                })
              : pageLabel;
            var pageRotation = pagesRotation.has(pageIndex)
              ? pagesRotation.get(pageIndex)
              : 0;
            var thumbnail = React__namespace.createElement(ThumbnailContainer, {
              doc: doc,
              pageHeight: pageHeight,
              pageIndex: pageIndex,
              pageRotation: pageRotation,
              pageWidth: pageWidth,
              rotation: rotation,
              shouldRender: renderPageIndex === pageIndex,
              thumbnailWidth: thumbnailWidth,
              onRenderCompleted: handleRenderCompleted,
              onVisibilityChanged: handleVisibilityChanged,
            });
            return renderThumbnailItem
              ? renderThumbnailItem({
                  currentPage: currentPage,
                  key: key,
                  numPages: numPages,
                  pageIndex: pageIndex,
                  renderPageLabel: React__namespace.createElement(
                    React__namespace.Fragment,
                    null,
                    label
                  ),
                  renderPageThumbnail: thumbnail,
                  onJumpToPage: function () {
                    return onJumpToPage(pageIndex);
                  },
                  onRotatePage: function (direction) {
                    return onRotatePage(pageIndex, direction);
                  },
                })
              : React__namespace.createElement(
                  'div',
                  {
                    key: key,
                  },
                  React__namespace.createElement(
                    'div',
                    {
                      className: core.classNames({
                        'rpv-thumbnail__item': true,
                        'rpv-thumbnail__item--dual-even':
                          viewMode === core.ViewMode.DualPage &&
                          pageIndex % 2 === 0,
                        'rpv-thumbnail__item--dual-odd':
                          viewMode === core.ViewMode.DualPage &&
                          pageIndex % 2 === 1,
                        'rpv-thumbnail__item--dual-cover': isCover,
                        'rpv-thumbnail__item--dual-cover-even':
                          viewMode === core.ViewMode.DualPageWithCover &&
                          !isCover &&
                          pageIndex % 2 === 0,
                        'rpv-thumbnail__item--dual-cover-odd':
                          viewMode === core.ViewMode.DualPageWithCover &&
                          !isCover &&
                          pageIndex % 2 === 1,
                        'rpv-thumbnail__item--single':
                          viewMode === core.ViewMode.SinglePage,
                        'rpv-thumbnail__item--selected':
                          currentPage === pageIndex,
                      }),
                      role: 'button',
                      tabIndex: currentPage === pageIndex ? 0 : -1,
                      onClick: function () {
                        return onJumpToPage(pageIndex);
                      },
                    },
                    thumbnail
                  ),
                  React__namespace.createElement(
                    'div',
                    {
                      'data-testid': 'thumbnail__label-'.concat(pageIndex),
                      className: 'rpv-thumbnail__label',
                    },
                    label
                  )
                );
          };
          return React__namespace.createElement(
            'div',
            {
              ref: containerRef,
              'data-testid': 'thumbnail__list',
              className: core.classNames({
                'rpv-thumbnail__list': true,
                'rpv-thumbnail__list--horizontal':
                  thumbnailDirection === exports.ThumbnailDirection.Horizontal,
                'rpv-thumbnail__list--rtl': isRtl,
                'rpv-thumbnail__list--vertical':
                  thumbnailDirection === exports.ThumbnailDirection.Vertical,
              }),
              onKeyDown: handleKeyDown,
            },
            chunks.map(function (chunkItem, index) {
              var isSelectedChunk = false;
              switch (viewMode) {
                case core.ViewMode.DualPage:
                  isSelectedChunk =
                    currentPage === 2 * index || currentPage === 2 * index + 1;
                  break;
                case core.ViewMode.DualPageWithCover:
                  isSelectedChunk =
                    (currentPage === 0 && index === 0) ||
                    (index > 0 && currentPage === 2 * index - 1) ||
                    (index > 0 && currentPage === 2 * index);
                  break;
                case core.ViewMode.SinglePage:
                default:
                  isSelectedChunk = currentPage === index;
                  break;
              }
              return React__namespace.createElement(
                'div',
                {
                  className: core.classNames({
                    'rpv-thumbnail__items': true,
                    'rpv-thumbnail__items--dual':
                      viewMode === core.ViewMode.DualPage,
                    'rpv-thumbnail__items--dual-cover':
                      viewMode === core.ViewMode.DualPageWithCover,
                    'rpv-thumbnail__items--single':
                      viewMode === core.ViewMode.SinglePage,
                    'rpv-thumbnail__items--selected': isSelectedChunk,
                  }),
                  key: ''.concat(index, '___').concat(viewMode),
                },
                chunkItem.map(function (pageIndex) {
                  return renderPageThumbnail(pageIndex);
                })
              );
            })
          );
        };
        var ThumbnailListWithStore = function (_a) {
          var renderCurrentPageLabel = _a.renderCurrentPageLabel,
            renderThumbnailItem = _a.renderThumbnailItem,
            store = _a.store,
            thumbnailDirection = _a.thumbnailDirection,
            thumbnailWidth = _a.thumbnailWidth;
          var _b = React__namespace.useState(store.get('doc')),
            currentDoc = _b[0],
            setCurrentDoc = _b[1];
          var _c = React__namespace.useState(store.get('currentPage') || 0),
            currentPage = _c[0],
            setCurrentPage = _c[1];
          var _d = React__namespace.useState(store.get('pageHeight') || 0),
            pageHeight = _d[0],
            setPageHeight = _d[1];
          var _e = React__namespace.useState(store.get('pageWidth') || 0),
            pageWidth = _e[0],
            setPageWidth = _e[1];
          var _f = React__namespace.useState(store.get('rotation') || 0),
            rotation = _f[0],
            setRotation = _f[1];
          var _g = React__namespace.useState(
              store.get('pagesRotation') || new Map()
            ),
            pagesRotation = _g[0],
            setPagesRotation = _g[1];
          var _h = React__namespace.useState(store.get('rotatedPage') || -1),
            rotatedPage = _h[0],
            setRotatedPage = _h[1];
          var _j = React__namespace.useState(store.get('viewMode')),
            viewMode = _j[0],
            setViewMode = _j[1];
          var handleCurrentPageChanged = function (currentPageIndex) {
            setCurrentPage(currentPageIndex);
          };
          var handleDocumentChanged = function (doc) {
            setCurrentDoc(doc);
          };
          var handlePageHeightChanged = function (height) {
            setPageHeight(height);
          };
          var handlePageWidthChanged = function (width) {
            setPageWidth(width);
          };
          var handleRotationChanged = function (currentRotation) {
            setRotation(currentRotation);
          };
          var handlePagesRotationChanged = function (rotations) {
            setPagesRotation(rotations);
          };
          var handleRotatedPage = function (rotatedPage) {
            setRotatedPage(rotatedPage);
          };
          var handleViewModeChanged = function (viewMode) {
            setViewMode(viewMode);
          };
          var jump = function (pageIndex) {
            var jumpToPage = store.get('jumpToPage');
            if (jumpToPage) {
              jumpToPage(pageIndex);
            }
          };
          var rotatePage = function (pageIndex, direction) {
            store.get('rotatePage')(pageIndex, direction);
          };
          React__namespace.useEffect(function () {
            store.subscribe('doc', handleDocumentChanged);
            store.subscribe('pageHeight', handlePageHeightChanged);
            store.subscribe('pageWidth', handlePageWidthChanged);
            store.subscribe('rotatedPage', handleRotatedPage);
            store.subscribe('rotation', handleRotationChanged);
            store.subscribe('pagesRotation', handlePagesRotationChanged);
            store.subscribe('viewMode', handleViewModeChanged);
            return function () {
              store.unsubscribe('doc', handleDocumentChanged);
              store.unsubscribe('pageHeight', handlePageHeightChanged);
              store.unsubscribe('pageWidth', handlePageWidthChanged);
              store.unsubscribe('rotatedPage', handleRotatedPage);
              store.unsubscribe('rotation', handleRotationChanged);
              store.unsubscribe('pagesRotation', handlePagesRotationChanged);
              store.unsubscribe('viewMode', handleViewModeChanged);
            };
          }, []);
          core.useIsomorphicLayoutEffect(function () {
            store.subscribe('currentPage', handleCurrentPageChanged);
            return function () {
              store.unsubscribe('currentPage', handleCurrentPageChanged);
            };
          }, []);
          return currentDoc
            ? React__namespace.createElement(
                core.LazyRender,
                {
                  testId: 'thumbnail__list-container',
                  attrs: {
                    className: 'rpv-thumbnail__list-container',
                  },
                },
                React__namespace.createElement(
                  FetchLabels,
                  {
                    doc: currentDoc,
                  },
                  function (labels) {
                    return React__namespace.createElement(ThumbnailList, {
                      currentPage: currentPage,
                      doc: currentDoc,
                      labels: labels,
                      pagesRotation: pagesRotation,
                      pageHeight: pageHeight,
                      pageWidth: pageWidth,
                      renderCurrentPageLabel: renderCurrentPageLabel,
                      renderThumbnailItem: renderThumbnailItem,
                      rotatedPage: rotatedPage,
                      rotation: rotation,
                      thumbnailDirection: thumbnailDirection,
                      thumbnailWidth: thumbnailWidth,
                      viewMode: viewMode,
                      onJumpToPage: jump,
                      onRotatePage: rotatePage,
                    });
                  }
                )
              )
            : React__namespace.createElement(
                'div',
                {
                  'data-testid': 'thumbnail-list__loader',
                  className: 'rpv-thumbnail__loader',
                },
                React__namespace.useContext(SpinnerContext).renderSpinner()
              );
        };
        var thumbnailPlugin = function (pluginProps) {
          var store = React__namespace.useMemo(function () {
            return core.createStore({
              rotatePage: function () {},
              viewMode: core.ViewMode.SinglePage,
            });
          }, []);
          var _a = React__namespace.useState(''),
            docId = _a[0],
            setDocId = _a[1];
          var CoverDecorator = function (props) {
            return React__namespace.createElement(
              Cover,
              __assign({}, props, {
                renderSpinner:
                  pluginProps === null || pluginProps === void 0
                    ? void 0
                    : pluginProps.renderSpinner,
                store: store,
              })
            );
          };
          var ThumbnailsDecorator = React__namespace.useCallback(
            function (props) {
              return React__namespace.createElement(
                SpinnerContext.Provider,
                {
                  value: {
                    renderSpinner:
                      (pluginProps === null || pluginProps === void 0
                        ? void 0
                        : pluginProps.renderSpinner) || defaultSpinner,
                  },
                },
                React__namespace.createElement(ThumbnailListWithStore, {
                  renderCurrentPageLabel:
                    pluginProps === null || pluginProps === void 0
                      ? void 0
                      : pluginProps.renderCurrentPageLabel,
                  renderThumbnailItem:
                    props === null || props === void 0
                      ? void 0
                      : props.renderThumbnailItem,
                  store: store,
                  thumbnailDirection:
                    (props === null || props === void 0
                      ? void 0
                      : props.thumbnailDirection) ||
                    exports.ThumbnailDirection.Vertical,
                  thumbnailWidth:
                    (pluginProps === null || pluginProps === void 0
                      ? void 0
                      : pluginProps.thumbnailWidth) || 100,
                })
              );
            },
            [docId]
          );
          return {
            install: function (pluginFunctions) {
              store.update('jumpToPage', pluginFunctions.jumpToPage);
              store.update('rotatePage', pluginFunctions.rotatePage);
            },
            onDocumentLoad: function (props) {
              setDocId(props.doc.loadingTask.docId);
              store.update('doc', props.doc);
            },
            onViewerStateChange: function (viewerState) {
              store.update('currentPage', viewerState.pageIndex);
              store.update('pagesRotation', viewerState.pagesRotation);
              store.update('pageHeight', viewerState.pageHeight);
              store.update('pageWidth', viewerState.pageWidth);
              store.update('rotation', viewerState.rotation);
              store.update('rotatedPage', viewerState.rotatedPage);
              store.update('viewMode', viewerState.viewMode);
              return viewerState;
            },
            Cover: CoverDecorator,
            Thumbnails: ThumbnailsDecorator,
          };
        };
        exports.thumbnailPlugin = thumbnailPlugin;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/thumbnail/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/thumbnail/lib/cjs/thumbnail.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
  '[project]/node_modules/@react-pdf-viewer/selection-mode/lib/cjs/selection-mode.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/selection-mode/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        var HandToolIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M11.5,5.5v-2C11.5,2.672,12.172,2,13,2s1.5,0.672,1.5,1.5v2 M14.5,11.5v-6C14.5,4.672,15.172,4,16,4\n            c0.828,0,1.5,0.672,1.5,1.5v3 M17.5,13V8.5C17.5,7.672,18.172,7,19,7s1.5,0.672,1.5,1.5v10c0,2.761-2.239,5-5,5h-3.335\n            c-1.712-0.001-3.305-0.876-4.223-2.321C6.22,18.467,4.083,14,4.083,14c-0.378-0.545-0.242-1.292,0.303-1.67\n            c0.446-0.309,1.044-0.281,1.458,0.07L8.5,15.5v-10C8.5,4.672,9.172,4,10,4s1.5,0.672,1.5,1.5v6',
            })
          );
        };
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign =
          function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        exports.SelectionMode = void 0;
        (function (SelectionMode) {
          SelectionMode['Hand'] = 'Hand';
          SelectionMode['Text'] = 'Text';
        })(exports.SelectionMode || (exports.SelectionMode = {}));
        var TextSelectionIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M13.675,11.671l2.941-2.941c0.195-0.196,0.195-0.512-0.001-0.707C16.563,7.971,16.5,7.931,16.43,7.906\n            L4.168,3.527C3.908,3.434,3.622,3.57,3.529,3.83c-0.039,0.109-0.039,0.228,0,0.336l4.379,12.262\n            c0.093,0.26,0.379,0.396,0.639,0.303c0.07-0.025,0.133-0.065,0.185-0.117l2.943-2.943l6.146,6.146c0.195,0.195,0.512,0.195,0.707,0\n            l1.293-1.293c0.195-0.195,0.195-0.512,0-0.707L13.675,11.671z',
            })
          );
        };
        var SwitchSelectionModeDecorator = function (_a) {
          var children = _a.children,
            mode = _a.mode,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label = '';
          var icon = React__namespace.createElement(TextSelectionIcon, null);
          switch (mode) {
            case exports.SelectionMode.Hand:
              label =
                l10n && l10n.selectionMode
                  ? l10n.selectionMode.handTool
                  : 'Hand tool';
              icon = React__namespace.createElement(HandToolIcon, null);
              break;
            case exports.SelectionMode.Text:
            default:
              label =
                l10n && l10n.selectionMode
                  ? l10n.selectionMode.textSelectionTool
                  : 'Text selection tool';
              icon = React__namespace.createElement(TextSelectionIcon, null);
              break;
          }
          return children({
            icon: icon,
            label: label,
            onClick: onClick,
          });
        };
        var TOOLTIP_OFFSET = {
          left: 0,
          top: 8,
        };
        var SwitchSelectionModeButton = function (_a) {
          var isSelected = _a.isSelected,
            mode = _a.mode,
            onClick = _a.onClick;
          var testId = '';
          switch (mode) {
            case exports.SelectionMode.Hand:
              testId = 'selection-mode__hand-button';
              break;
            case exports.SelectionMode.Text:
            default:
              testId = 'selection-mode__text-button';
          }
          return React__namespace.createElement(
            SwitchSelectionModeDecorator,
            {
              mode: mode,
              onClick: onClick,
            },
            function (props) {
              return React__namespace.createElement(core.Tooltip, {
                ariaControlsSuffix: 'selection-mode-switch',
                position: core.Position.BottomCenter,
                target: React__namespace.createElement(
                  core.MinimalButton,
                  {
                    ariaLabel: props.label,
                    isSelected: isSelected,
                    testId: testId,
                    onClick: props.onClick,
                  },
                  props.icon
                ),
                content: function () {
                  return props.label;
                },
                offset: TOOLTIP_OFFSET,
              });
            }
          );
        };
        var SwitchSelectionMode = function (_a) {
          var children = _a.children,
            mode = _a.mode,
            store = _a.store;
          var onClick = function () {
            return store.update('selectionMode', mode);
          };
          var isSelected = mode === store.get('selectionMode');
          var defaultChildren = function (props) {
            return React__namespace.createElement(SwitchSelectionModeButton, {
              isSelected: isSelected,
              mode: props.mode,
              onClick: props.onClick,
            });
          };
          var render = children || defaultChildren;
          return render({
            isSelected: isSelected,
            mode: mode,
            onClick: onClick,
          });
        };
        var SwitchSelectionModeMenuItem = function (_a) {
          var isSelected = _a.isSelected,
            mode = _a.mode,
            onClick = _a.onClick;
          var testId = '';
          switch (mode) {
            case exports.SelectionMode.Hand:
              testId = 'selection-mode__hand-menu';
              break;
            case exports.SelectionMode.Text:
            default:
              testId = 'selection-mode__text-menu';
          }
          return React__namespace.createElement(
            SwitchSelectionModeDecorator,
            {
              mode: mode,
              onClick: onClick,
            },
            function (props) {
              return React__namespace.createElement(
                core.MenuItem,
                {
                  checked: isSelected,
                  icon: props.icon,
                  testId: testId,
                  onClick: props.onClick,
                },
                props.label
              );
            }
          );
        };
        var Tracker = function (_a) {
          var store = _a.store;
          var pagesRef = React__namespace.useRef(null);
          var _b = React__namespace.useState(exports.SelectionMode.Text),
            selectionMode = _b[0],
            setSelectionMode = _b[1];
          var pos = React__namespace.useRef({
            top: 0,
            left: 0,
            x: 0,
            y: 0,
          });
          var onMouseMoveHandler = function (e) {
            var ele = pagesRef.current;
            if (!ele) {
              return;
            }
            ele.scrollTop = pos.current.top - (e.clientY - pos.current.y);
            ele.scrollLeft = pos.current.left - (e.clientX - pos.current.x);
          };
          var onMouseUpHandler = function () {
            var ele = pagesRef.current;
            if (!ele) {
              return;
            }
            ele.classList.add('rpv-selection-mode__grab');
            ele.classList.remove('rpv-selection-mode__grabbing');
            document.removeEventListener('mousemove', onMouseMoveHandler);
            document.removeEventListener('mouseup', onMouseUpHandler);
          };
          var onMouseDownHandler = function (e) {
            var ele = pagesRef.current;
            if (!ele || selectionMode === exports.SelectionMode.Text) {
              return;
            }
            ele.classList.remove('rpv-selection-mode__grab');
            ele.classList.add('rpv-selection-mode__grabbing');
            e.preventDefault();
            e.stopPropagation();
            pos.current = {
              left: ele.scrollLeft,
              top: ele.scrollTop,
              x: e.clientX,
              y: e.clientY,
            };
            document.addEventListener('mousemove', onMouseMoveHandler);
            document.addEventListener('mouseup', onMouseUpHandler);
          };
          var handlePagesContainer = function (getPagesContainer) {
            pagesRef.current = getPagesContainer();
          };
          var handleSelectionModeChanged = function (mode) {
            setSelectionMode(mode);
          };
          React__namespace.useEffect(
            function () {
              var ele = pagesRef.current;
              if (!ele) {
                return;
              }
              selectionMode === exports.SelectionMode.Hand
                ? ele.classList.add('rpv-selection-mode__grab')
                : ele.classList.remove('rpv-selection-mode__grab');
              ele.addEventListener('mousedown', onMouseDownHandler);
              return function () {
                ele.removeEventListener('mousedown', onMouseDownHandler);
              };
            },
            [selectionMode]
          );
          React__namespace.useEffect(function () {
            store.subscribe('getPagesContainer', handlePagesContainer);
            store.subscribe('selectionMode', handleSelectionModeChanged);
            return function () {
              store.unsubscribe('getPagesContainer', handlePagesContainer);
              store.unsubscribe('selectionMode', handleSelectionModeChanged);
            };
          }, []);
          return React__namespace.createElement(
            React__namespace.Fragment,
            null
          );
        };
        var selectionModePlugin = function (props) {
          var store = React__namespace.useMemo(function () {
            return core.createStore();
          }, []);
          var SwitchSelectionModeDecorator = function (props) {
            return React__namespace.createElement(
              SwitchSelectionMode,
              __assign({}, props, {
                store: store,
              })
            );
          };
          var SwitchSelectionModeButtonDecorator = function (props) {
            return React__namespace.createElement(
              SwitchSelectionModeDecorator,
              {
                mode: props.mode,
              },
              function (p) {
                return React__namespace.createElement(
                  SwitchSelectionModeButton,
                  {
                    isSelected: p.isSelected,
                    mode: p.mode,
                    onClick: function () {
                      p.onClick();
                    },
                  }
                );
              }
            );
          };
          var SwitchSelectionModeMenuItemDecorator = function (props) {
            return React__namespace.createElement(
              SwitchSelectionModeDecorator,
              {
                mode: props.mode,
              },
              function (p) {
                return React__namespace.createElement(
                  SwitchSelectionModeMenuItem,
                  {
                    isSelected: p.isSelected,
                    mode: p.mode,
                    onClick: function () {
                      p.onClick();
                      props.onClick();
                    },
                  }
                );
              }
            );
          };
          var renderViewer = function (props) {
            var currentSlot = props.slot;
            if (currentSlot.subSlot && currentSlot.subSlot.children) {
              currentSlot.subSlot.children = React__namespace.createElement(
                React__namespace.Fragment,
                null,
                React__namespace.createElement(Tracker, {
                  store: store,
                }),
                currentSlot.subSlot.children
              );
            }
            return currentSlot;
          };
          return {
            install: function (pluginFunctions) {
              store.update(
                'selectionMode',
                props && props.selectionMode
                  ? props.selectionMode
                  : exports.SelectionMode.Text
              );
              store.update(
                'getPagesContainer',
                pluginFunctions.getPagesContainer
              );
            },
            renderViewer: renderViewer,
            SwitchSelectionMode: SwitchSelectionModeDecorator,
            SwitchSelectionModeButton: SwitchSelectionModeButtonDecorator,
            SwitchSelectionModeMenuItem: SwitchSelectionModeMenuItemDecorator,
          };
        };
        exports.HandToolIcon = HandToolIcon;
        exports.TextSelectionIcon = TextSelectionIcon;
        exports.selectionModePlugin = selectionModePlugin;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/selection-mode/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/selection-mode/lib/cjs/selection-mode.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
  '[project]/node_modules/@react-pdf-viewer/full-screen/lib/cjs/full-screen.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/full-screen/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        var ExitFullScreenIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M11.5 23.499L11.5 14.499',
            }),
            React__namespace.createElement('path', {
              d: 'M7.5 18.499L11.5 14.499 15.5 18.499',
            }),
            React__namespace.createElement('path', {
              d: 'M11.5 1.499L11.5 10.499',
            }),
            React__namespace.createElement('path', {
              d: 'M7.5 6.499L11.5 10.499 15.5 6.499',
            }),
            React__namespace.createElement('path', {
              d: 'M20.5 12.499L1.5 12.499',
            })
          );
        };
        var FullScreenIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M0.5 12L23.5 12',
            }),
            React__namespace.createElement('path', {
              d: 'M11.5 1L11.5 23',
            }),
            React__namespace.createElement('path', {
              d: 'M8.5 4L11.5 1 14.5 4',
            }),
            React__namespace.createElement('path', {
              d: 'M20.5 9L23.5 12 20.5 15',
            }),
            React__namespace.createElement('path', {
              d: 'M3.5 15L0.5 12 3.5 9',
            }),
            React__namespace.createElement('path', {
              d: 'M14.5 20L11.5 23 8.5 20',
            })
          );
        };
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign =
          function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var TOOLTIP_OFFSET$1 = {
          left: 0,
          top: 8,
        };
        var EnterFullScreenButton = function (_a) {
          var enableShortcuts = _a.enableShortcuts,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label =
            l10n && l10n.fullScreen
              ? l10n.fullScreen.enterFullScreen
              : 'Full screen';
          var ariaKeyShortcuts = enableShortcuts
            ? core.isMac()
              ? 'Meta+Ctrl+F'
              : 'F11'
            : '';
          return React__namespace.createElement(core.Tooltip, {
            ariaControlsSuffix: 'full-screen-enter',
            position: core.Position.BottomCenter,
            target: React__namespace.createElement(
              core.MinimalButton,
              {
                ariaKeyShortcuts: ariaKeyShortcuts,
                ariaLabel: label,
                isDisabled: !core.isFullScreenEnabled(),
                testId: 'full-screen__enter-button',
                onClick: onClick,
              },
              React__namespace.createElement(FullScreenIcon, null)
            ),
            content: function () {
              return label;
            },
            offset: TOOLTIP_OFFSET$1,
          });
        };
        var TOOLTIP_OFFSET = {
          left: 0,
          top: 8,
        };
        var ExitFullScreenButtonWithTooltip = function (_a) {
          var onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var exitFullScreenLabel =
            l10n && l10n.fullScreen
              ? l10n.fullScreen.exitFullScreen
              : 'Exit full screen';
          return React__namespace.createElement(core.Tooltip, {
            ariaControlsSuffix: 'full-screen-exit',
            position: core.Position.BottomCenter,
            target: React__namespace.createElement(
              core.MinimalButton,
              {
                ariaKeyShortcuts: 'Esc',
                ariaLabel: exitFullScreenLabel,
                testId: 'full-screen__exit-button-with-tooltip',
                onClick: onClick,
              },
              React__namespace.createElement(ExitFullScreenIcon, null)
            ),
            content: function () {
              return exitFullScreenLabel;
            },
            offset: TOOLTIP_OFFSET,
          });
        };
        var useEnterFullScreen = function (getFullScreenTarget, store) {
          var _a = React__namespace.useState(store.get('fullScreenMode')),
            fullScreenMode = _a[0],
            setFullScreenMode = _a[1];
          var handleFullScreenMode = React__namespace.useCallback(function (
            fullScreenMode
          ) {
            setFullScreenMode(fullScreenMode);
          }, []);
          var enterFullScreen = function () {
            var pagesContainer = store.get('getPagesContainer');
            if (!pagesContainer) {
              return;
            }
            var target = getFullScreenTarget(pagesContainer());
            store.get('enterFullScreenMode')(target);
          };
          var exitFullScreen = function () {
            store.get('exitFullScreenMode')();
          };
          React__namespace.useEffect(function () {
            store.subscribe('fullScreenMode', handleFullScreenMode);
            return function () {
              store.unsubscribe('fullScreenMode', handleFullScreenMode);
            };
          }, []);
          return {
            enterFullScreen: enterFullScreen,
            exitFullScreen: exitFullScreen,
            isFullScreen:
              fullScreenMode === core.FullScreenMode.Entering ||
              fullScreenMode === core.FullScreenMode.EnteredCompletely,
          };
        };
        var EnterFullScreen = function (_a) {
          var children = _a.children,
            enableShortcuts = _a.enableShortcuts,
            getFullScreenTarget = _a.getFullScreenTarget,
            store = _a.store;
          var _b = useEnterFullScreen(getFullScreenTarget, store),
            enterFullScreen = _b.enterFullScreen,
            exitFullScreen = _b.exitFullScreen,
            isFullScreen = _b.isFullScreen;
          var defaultChildren = function (props) {
            return isFullScreen
              ? React__namespace.createElement(
                  ExitFullScreenButtonWithTooltip,
                  {
                    onClick: props.onClick,
                  }
                )
              : React__namespace.createElement(EnterFullScreenButton, {
                  enableShortcuts: enableShortcuts,
                  onClick: props.onClick,
                });
          };
          var render = children || defaultChildren;
          return render({
            onClick: isFullScreen ? exitFullScreen : enterFullScreen,
          });
        };
        var EnterFullScreenMenuItem = function (_a) {
          var onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label =
            l10n && l10n.fullScreen
              ? l10n.fullScreen.enterFullScreen
              : 'Full screen';
          return React__namespace.createElement(
            core.MenuItem,
            {
              icon: React__namespace.createElement(FullScreenIcon, null),
              isDisabled: !core.isFullScreenEnabled(),
              testId: 'full-screen__enter-menu',
              onClick: onClick,
            },
            label
          );
        };
        var ExitFullScreenButton = function (_a) {
          var onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var direction = React__namespace.useContext(
            core.ThemeContext
          ).direction;
          var isRtl = direction === core.TextDirection.RightToLeft;
          var exitFullScreenLabel =
            l10n && l10n.fullScreen
              ? l10n.fullScreen.exitFullScreen
              : 'Exit full screen';
          return React__namespace.createElement(
            'div',
            {
              className: core.classNames({
                'rpv-full-screen__exit-button': true,
                'rpv-full-screen__exit-button--ltr': !isRtl,
                'rpv-full-screen__exit-button--rtl': isRtl,
              }),
            },
            React__namespace.createElement(
              core.MinimalButton,
              {
                ariaLabel: exitFullScreenLabel,
                testId: 'full-screen__exit-button',
                onClick: onClick,
              },
              React__namespace.createElement(ExitFullScreenIcon, null)
            )
          );
        };
        var ExitFullScreen = function (_a) {
          var children = _a.children,
            getFullScreenTarget = _a.getFullScreenTarget,
            store = _a.store;
          var _b = useEnterFullScreen(getFullScreenTarget, store),
            enterFullScreen = _b.enterFullScreen,
            exitFullScreen = _b.exitFullScreen,
            isFullScreen = _b.isFullScreen;
          var defaultChildren = function (props) {
            return React__namespace.createElement(ExitFullScreenButton, {
              onClick: props.onClick,
            });
          };
          var render = children || defaultChildren;
          return (
            isFullScreen &&
            render({
              onClick: isFullScreen ? exitFullScreen : enterFullScreen,
            })
          );
        };
        var FullScreenModeTracker = function (_a) {
          var store = _a.store,
            onEnterFullScreen = _a.onEnterFullScreen,
            onExitFullScreen = _a.onExitFullScreen;
          var _b = React__namespace.useState(store.get('fullScreenMode')),
            fullScreenMode = _b[0],
            setFullScreenMode = _b[1];
          var handleFullScreenMode = React__namespace.useCallback(function (
            fullScreenMode
          ) {
            setFullScreenMode(fullScreenMode);
          }, []);
          var handleEnteredFullScreen = function () {
            onEnterFullScreen(store.get('zoom'));
          };
          var handleExitedFullScreen = function () {
            onExitFullScreen(store.get('zoom'));
          };
          React__namespace.useEffect(
            function () {
              switch (fullScreenMode) {
                case core.FullScreenMode.EnteredCompletely:
                  handleEnteredFullScreen();
                  break;
                case core.FullScreenMode.Exited:
                  handleExitedFullScreen();
                  break;
              }
            },
            [fullScreenMode]
          );
          React__namespace.useEffect(function () {
            store.subscribe('fullScreenMode', handleFullScreenMode);
            return function () {
              store.unsubscribe('fullScreenMode', handleFullScreenMode);
            };
          }, []);
          return (
            (fullScreenMode === core.FullScreenMode.Entering ||
              fullScreenMode === core.FullScreenMode.Entered) &&
            React__namespace.createElement(
              'div',
              {
                className: 'rpv-full-screen__overlay',
              },
              React__namespace.createElement(core.Spinner, null)
            )
          );
        };
        var ShortcutHandler = function (_a) {
          var containerRef = _a.containerRef,
            getFullScreenTarget = _a.getFullScreenTarget,
            store = _a.store;
          var enterFullScreen = useEnterFullScreen(
            getFullScreenTarget,
            store
          ).enterFullScreen;
          var keydownHandler = function (e) {
            if (e.shiftKey || e.altKey) {
              return;
            }
            var areShortcutsPressed = core.isMac()
              ? e.metaKey && e.ctrlKey && e.key === 'f'
              : e.key === 'F11';
            if (!areShortcutsPressed) {
              return;
            }
            var containerEle = containerRef.current;
            if (
              !containerEle ||
              !document.activeElement ||
              !containerEle.contains(document.activeElement)
            ) {
              return;
            }
            e.preventDefault();
            enterFullScreen();
          };
          React__namespace.useEffect(
            function () {
              var containerEle = containerRef.current;
              if (!containerEle) {
                return;
              }
              document.addEventListener('keydown', keydownHandler);
              return function () {
                document.removeEventListener('keydown', keydownHandler);
              };
            },
            [containerRef.current]
          );
          return React__namespace.createElement(
            React__namespace.Fragment,
            null
          );
        };
        var fullScreenPlugin = function (props) {
          var defaultFullScreenTarget = function (ele) {
            return ele;
          };
          var getFullScreenTarget =
            (props === null || props === void 0
              ? void 0
              : props.getFullScreenTarget) || defaultFullScreenTarget;
          var fullScreenPluginProps = React__namespace.useMemo(function () {
            return Object.assign(
              {},
              {
                enableShortcuts: true,
                onEnterFullScreen: function () {},
                onExitFullScreen: function () {},
              },
              props
            );
          }, []);
          var store = React__namespace.useMemo(function () {
            return core.createStore({
              enterFullScreenMode: function () {},
              exitFullScreenMode: function () {},
              fullScreenMode: core.FullScreenMode.Normal,
              zoom: function () {},
            });
          }, []);
          var EnterFullScreenDecorator = function (props) {
            return React__namespace.createElement(
              EnterFullScreen,
              __assign({}, props, {
                enableShortcuts: fullScreenPluginProps.enableShortcuts,
                getFullScreenTarget: getFullScreenTarget,
                store: store,
              })
            );
          };
          var EnterFullScreenButtonDecorator = function () {
            return React__namespace.createElement(
              EnterFullScreenDecorator,
              null,
              function (renderProps) {
                return React__namespace.createElement(
                  EnterFullScreenButton,
                  __assign(
                    {
                      enableShortcuts: fullScreenPluginProps.enableShortcuts,
                    },
                    renderProps
                  )
                );
              }
            );
          };
          var EnterFullScreenMenuItemDecorator = function (props) {
            return React__namespace.createElement(
              EnterFullScreenDecorator,
              null,
              function (p) {
                return React__namespace.createElement(EnterFullScreenMenuItem, {
                  onClick: function () {
                    p.onClick();
                    props.onClick();
                  },
                });
              }
            );
          };
          var ExitFullScreenDecorator = function () {
            return React__namespace.createElement(
              ExitFullScreen,
              {
                getFullScreenTarget: getFullScreenTarget,
                store: store,
              },
              props === null || props === void 0
                ? void 0
                : props.renderExitFullScreenButton
            );
          };
          var renderViewer = function (props) {
            var currentSlot = props.slot;
            if (currentSlot.subSlot) {
              currentSlot.subSlot.children = React__namespace.createElement(
                React__namespace.Fragment,
                null,
                fullScreenPluginProps.enableShortcuts &&
                  React__namespace.createElement(ShortcutHandler, {
                    containerRef: props.containerRef,
                    getFullScreenTarget: getFullScreenTarget,
                    store: store,
                  }),
                React__namespace.createElement(FullScreenModeTracker, {
                  store: store,
                  onEnterFullScreen: fullScreenPluginProps.onEnterFullScreen,
                  onExitFullScreen: fullScreenPluginProps.onExitFullScreen,
                }),
                React__namespace.createElement(ExitFullScreenDecorator, null),
                currentSlot.subSlot.children
              );
            }
            return currentSlot;
          };
          return {
            install: function (pluginFunctions) {
              store.update(
                'enterFullScreenMode',
                pluginFunctions.enterFullScreenMode
              );
              store.update(
                'exitFullScreenMode',
                pluginFunctions.exitFullScreenMode
              );
              store.update(
                'getPagesContainer',
                pluginFunctions.getPagesContainer
              );
              store.update('zoom', pluginFunctions.zoom);
            },
            onViewerStateChange: function (viewerState) {
              store.update('fullScreenMode', viewerState.fullScreenMode);
              return viewerState;
            },
            renderViewer: renderViewer,
            EnterFullScreen: EnterFullScreenDecorator,
            EnterFullScreenButton: EnterFullScreenButtonDecorator,
            EnterFullScreenMenuItem: EnterFullScreenMenuItemDecorator,
          };
        };
        exports.ExitFullScreenIcon = ExitFullScreenIcon;
        exports.FullScreenIcon = FullScreenIcon;
        exports.fullScreenPlugin = fullScreenPlugin;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/full-screen/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/full-screen/lib/cjs/full-screen.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
  '[project]/node_modules/@react-pdf-viewer/get-file/lib/cjs/get-file.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/get-file/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        var DownloadIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M5.5,11.5c-.275,0-.341.159-.146.354l6.292,6.293a.5.5,0,0,0,.709,0l6.311-6.275c.2-.193.13-.353-.145-.355L15.5,11.5V1.5a1,1,0,0,0-1-1h-5a1,1,0,0,0-1,1V11a.5.5,0,0,1-.5.5Z',
            }),
            React__namespace.createElement('path', {
              d: 'M23.5,18.5v4a1,1,0,0,1-1,1H1.5a1,1,0,0,1-1-1v-4',
            })
          );
        };
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign =
          function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var TOOLTIP_OFFSET = {
          left: 0,
          top: 8,
        };
        var DownloadButton = function (_a) {
          var onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label =
            l10n && l10n.download ? l10n.download.download : 'Download';
          return React__namespace.createElement(core.Tooltip, {
            ariaControlsSuffix: 'get-file',
            position: core.Position.BottomCenter,
            target: React__namespace.createElement(
              core.MinimalButton,
              {
                ariaLabel: label,
                testId: 'get-file__download-button',
                onClick: onClick,
              },
              React__namespace.createElement(DownloadIcon, null)
            ),
            content: function () {
              return label;
            },
            offset: TOOLTIP_OFFSET,
          });
        };
        var isChromeIOS = function () {
          return (
            /iphone|ipod|ipad/i.test(navigator.userAgent) &&
            /CriOS/i.test(navigator.userAgent)
          );
        };
        var isSafariIOS = function () {
          return (
            /iphone|ipod|ipad/i.test(navigator.userAgent) &&
            !/CriOS/i.test(navigator.userAgent)
          );
        };
        var encodeUint8Array = function (data) {
          return btoa(
            Array(data.length)
              .fill('')
              .map(function (_, i) {
                return String.fromCharCode(data[i]);
              })
              .join('')
          );
        };
        var download = function (url, saveAs) {
          var link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', saveAs);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
        var downloadBlob = function (data, saveAs, mimeType) {
          var blobUrl = URL.createObjectURL(
            new Blob([data], {
              type: mimeType,
            })
          );
          download(blobUrl, saveAs);
          if (blobUrl) {
            URL.revokeObjectURL(blobUrl);
          }
          return;
        };
        var downloadFile = function (doc, saveAs) {
          doc.getData().then(function (data) {
            isSafariIOS()
              ? downloadBlob(data, saveAs, 'application/octet-stream')
              : isChromeIOS()
                ? download(
                    'data:application/pdf;base64,'.concat(
                      encodeUint8Array(data)
                    ),
                    saveAs
                  )
                : downloadBlob(data, saveAs, 'application/pdf');
          });
        };
        var Download = function (_a) {
          var children = _a.children,
            fileNameGenerator = _a.fileNameGenerator,
            store = _a.store;
          var _b = React__namespace.useState(store.get('file')),
            currentFile = _b[0],
            setCurrentFile = _b[1];
          var _c = React__namespace.useState(store.get('doc')),
            currentDocument = _c[0],
            setCurrentDocument = _c[1];
          var handleDocumentChanged = function (doc) {
            setCurrentDocument(doc);
          };
          var handleFileChanged = function (file) {
            setCurrentFile(file);
          };
          React__namespace.useEffect(function () {
            store.subscribe('doc', handleDocumentChanged);
            store.subscribe('file', handleFileChanged);
            return function () {
              store.subscribe('doc', handleDocumentChanged);
              store.unsubscribe('file', handleFileChanged);
            };
          }, []);
          var download = function () {
            if (currentDocument && currentFile) {
              downloadFile(currentDocument, fileNameGenerator(currentFile));
            }
          };
          var defaultChildren = function (props) {
            return React__namespace.createElement(DownloadButton, {
              onClick: props.onClick,
            });
          };
          var render = children || defaultChildren;
          return render({
            onClick: download,
          });
        };
        var DownloadMenuItem = function (_a) {
          var onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label =
            l10n && l10n.download ? l10n.download.download : 'Download';
          return React__namespace.createElement(
            core.MenuItem,
            {
              icon: React__namespace.createElement(DownloadIcon, null),
              testId: 'get-file__download-menu',
              onClick: onClick,
            },
            label
          );
        };
        var getFileName = function (url) {
          var str = url.split('/').pop();
          return str ? str.split('#')[0].split('?')[0] : url;
        };
        var getFilePlugin = function (props) {
          var store = React__namespace.useMemo(function () {
            return core.createStore({});
          }, []);
          var defaultFileNameGenerator = function (file) {
            return file.name ? getFileName(file.name) : 'document.pdf';
          };
          var DownloadDecorator = function (downloadProps) {
            return React__namespace.createElement(
              Download,
              __assign({}, downloadProps, {
                fileNameGenerator: props
                  ? props.fileNameGenerator || defaultFileNameGenerator
                  : defaultFileNameGenerator,
                store: store,
              })
            );
          };
          var DownloadButtonDecorator = function () {
            return React__namespace.createElement(
              DownloadDecorator,
              null,
              function (props) {
                return React__namespace.createElement(
                  DownloadButton,
                  __assign({}, props)
                );
              }
            );
          };
          var DownloadMenuItemDecorator = function (props) {
            return React__namespace.createElement(
              DownloadDecorator,
              null,
              function (p) {
                return React__namespace.createElement(DownloadMenuItem, {
                  onClick: function () {
                    p.onClick();
                    props.onClick();
                  },
                });
              }
            );
          };
          return {
            onDocumentLoad: function (props) {
              store.update('doc', props.doc);
              store.update('file', props.file);
            },
            Download: DownloadDecorator,
            DownloadButton: DownloadButtonDecorator,
            DownloadMenuItem: DownloadMenuItemDecorator,
          };
        };
        exports.DownloadIcon = DownloadIcon;
        exports.getFilePlugin = getFilePlugin;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/get-file/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/get-file/lib/cjs/get-file.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
  '[project]/node_modules/@react-pdf-viewer/open/lib/cjs/open.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/open/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        var OpenFileIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M18.5,7.5c.275,0,.341-.159.146-.354L12.354.854a.5.5,0,0,0-.708,0L5.354,7.147c-.2.195-.129.354.146.354h3v10a1,1,0,0,0,1,1h5a1,1,0,0,0,1-1V7.5Z',
            }),
            React__namespace.createElement('path', {
              d: 'M23.5,18.5v4a1,1,0,0,1-1,1H1.5a1,1,0,0,1-1-1v-4',
            })
          );
        };
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign =
          function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var useTriggerOpen = function (store) {
          var inputRef = React__namespace.useRef();
          var openFile = function () {
            var inputEle = inputRef.current;
            if (inputEle) {
              inputEle.click();
              if (store.get('triggerOpenFile')) {
                store.update('triggerOpenFile', false);
              }
            }
          };
          var handleOpenFileTriggered = function (trigger) {
            if (trigger) {
              openFile();
            }
          };
          React__namespace.useEffect(function () {
            store.subscribe('triggerOpenFile', handleOpenFileTriggered);
            return function () {
              store.unsubscribe('triggerOpenFile', handleOpenFileTriggered);
            };
          }, []);
          return {
            inputRef: inputRef,
            openFile: openFile,
          };
        };
        var TOOLTIP_OFFSET = {
          left: 0,
          top: 8,
        };
        var OpenButton = function (_a) {
          var enableShortcuts = _a.enableShortcuts,
            store = _a.store,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label = l10n && l10n.open ? l10n.open.openFile : 'Open file';
          var _b = useTriggerOpen(store),
            inputRef = _b.inputRef,
            openFile = _b.openFile;
          var ariaKeyShortcuts = enableShortcuts
            ? core.isMac()
              ? 'Meta+O'
              : 'Ctrl+O'
            : '';
          return React__namespace.createElement(core.Tooltip, {
            ariaControlsSuffix: 'open',
            position: core.Position.BottomCenter,
            target: React__namespace.createElement(
              'div',
              {
                className: 'rpv-open__input-wrapper',
              },
              React__namespace.createElement('input', {
                accept: '.pdf',
                ref: inputRef,
                className: 'rpv-open__input',
                multiple: false,
                tabIndex: -1,
                title: '',
                type: 'file',
                onChange: onClick,
              }),
              React__namespace.createElement(
                core.MinimalButton,
                {
                  ariaKeyShortcuts: ariaKeyShortcuts,
                  ariaLabel: label,
                  testId: 'open__button',
                  onClick: openFile,
                },
                React__namespace.createElement(OpenFileIcon, null)
              )
            ),
            content: function () {
              return label;
            },
            offset: TOOLTIP_OFFSET,
          });
        };
        var Open = function (_a) {
          var children = _a.children,
            enableShortcuts = _a.enableShortcuts,
            store = _a.store;
          var handleOpenFiles = function (e) {
            var files = e.target.files;
            if (!files || !files.length) {
              return;
            }
            var openFile = store.get('openFile');
            if (openFile) {
              openFile(files[0]);
            }
          };
          var defaultChildren = function (props) {
            return React__namespace.createElement(OpenButton, {
              enableShortcuts: enableShortcuts,
              store: store,
              onClick: props.onClick,
            });
          };
          var render = children || defaultChildren;
          return render({
            onClick: handleOpenFiles,
          });
        };
        var OpenMenuItem = function (_a) {
          var store = _a.store,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label = l10n && l10n.open ? l10n.open.openFile : 'Open file';
          var _b = useTriggerOpen(store),
            inputRef = _b.inputRef,
            openFile = _b.openFile;
          return React__namespace.createElement(
            core.MenuItem,
            {
              icon: React__namespace.createElement(OpenFileIcon, null),
              testId: 'open__menu',
              onClick: openFile,
            },
            React__namespace.createElement(
              'div',
              {
                className: 'rpv-open__input-wrapper',
              },
              React__namespace.createElement('input', {
                accept: '.pdf',
                ref: inputRef,
                className: 'rpv-open__input',
                multiple: false,
                tabIndex: -1,
                title: '',
                type: 'file',
                onChange: onClick,
              }),
              label
            )
          );
        };
        var ShortcutHandler = function (_a) {
          var containerRef = _a.containerRef,
            store = _a.store;
          var keydownHandler = function (e) {
            if (e.shiftKey || e.altKey || e.key !== 'o') {
              return;
            }
            var isCommandPressed = core.isMac() ? e.metaKey : e.ctrlKey;
            if (!isCommandPressed) {
              return;
            }
            var containerEle = containerRef.current;
            if (
              !containerEle ||
              !document.activeElement ||
              !containerEle.contains(document.activeElement)
            ) {
              return;
            }
            e.preventDefault();
            store.update('triggerOpenFile', true);
          };
          React__namespace.useEffect(
            function () {
              var containerEle = containerRef.current;
              if (!containerEle) {
                return;
              }
              document.addEventListener('keydown', keydownHandler);
              return function () {
                document.removeEventListener('keydown', keydownHandler);
              };
            },
            [containerRef.current]
          );
          return React__namespace.createElement(
            React__namespace.Fragment,
            null
          );
        };
        var openPlugin = function (props) {
          var openPluginProps = React__namespace.useMemo(function () {
            return Object.assign(
              {},
              {
                enableShortcuts: true,
              },
              props
            );
          }, []);
          var store = React__namespace.useMemo(function () {
            return core.createStore({});
          }, []);
          var OpenDecorator = function (props) {
            return React__namespace.createElement(
              Open,
              __assign(
                {
                  enableShortcuts: openPluginProps.enableShortcuts,
                },
                props,
                {
                  store: store,
                }
              )
            );
          };
          var OpenButtonDecorator = function () {
            return React__namespace.createElement(OpenDecorator, null);
          };
          var OpenMenuItemDecorator = function () {
            return React__namespace.createElement(
              OpenDecorator,
              null,
              function (p) {
                return React__namespace.createElement(OpenMenuItem, {
                  store: store,
                  onClick: p.onClick,
                });
              }
            );
          };
          var renderViewer = function (props) {
            var slot = props.slot;
            var updateSlot = {
              children: React__namespace.createElement(
                React__namespace.Fragment,
                null,
                openPluginProps.enableShortcuts &&
                  React__namespace.createElement(ShortcutHandler, {
                    containerRef: props.containerRef,
                    store: store,
                  }),
                slot.children
              ),
            };
            return __assign(__assign({}, slot), updateSlot);
          };
          return {
            install: function (pluginFunctions) {
              store.update('openFile', pluginFunctions.openFile);
            },
            renderViewer: renderViewer,
            Open: OpenDecorator,
            OpenButton: OpenButtonDecorator,
            OpenMenuItem: OpenMenuItemDecorator,
          };
        };
        exports.OpenFileIcon = OpenFileIcon;
        exports.openPlugin = openPlugin;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/open/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/open/lib/cjs/open.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
  '[project]/node_modules/@react-pdf-viewer/page-navigation/lib/cjs/page-navigation.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/page-navigation/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        var DownArrowIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M2.32,2.966h19.452c0.552,0.001,1,0.449,0.999,1.001c0,0.182-0.05,0.36-0.144,0.516L12.9,20.552\n            c-0.286,0.472-0.901,0.624-1.373,0.338c-0.138-0.084-0.254-0.2-0.338-0.338L1.465,4.483C1.179,4.01,1.331,3.396,1.804,3.11\n            C1.96,3.016,2.138,2.966,2.32,2.966z',
            })
          );
        };
        var NextIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M0.541,5.627L11.666,18.2c0.183,0.207,0.499,0.226,0.706,0.043c0.015-0.014,0.03-0.028,0.043-0.043\n            L23.541,5.627',
            })
          );
        };
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign =
          function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var useCurrentPage = function (store) {
          var _a = React__namespace.useState(store.get('currentPage') || 0),
            currentPage = _a[0],
            setCurrentPage = _a[1];
          var handleCurrentPageChanged = function (currentPageIndex) {
            setCurrentPage(currentPageIndex);
          };
          core.useIsomorphicLayoutEffect(function () {
            store.subscribe('currentPage', handleCurrentPageChanged);
            return function () {
              store.unsubscribe('currentPage', handleCurrentPageChanged);
            };
          }, []);
          return {
            currentPage: currentPage,
          };
        };
        var useNumberOfPages = function (store) {
          var _a = React__namespace.useState(store.get('numberOfPages') || 0),
            numberOfPages = _a[0],
            setNumberOfPages = _a[1];
          var handleNumberOfPages = function (total) {
            setNumberOfPages(total);
          };
          React__namespace.useEffect(function () {
            store.subscribe('numberOfPages', handleNumberOfPages);
            return function () {
              store.unsubscribe('numberOfPages', handleNumberOfPages);
            };
          }, []);
          return {
            numberOfPages: numberOfPages,
          };
        };
        var CurrentPageInput = function (_a) {
          var store = _a.store;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var _b = React__namespace.useState('1'),
            editingPage = _b[0],
            setEditingPage = _b[1];
          var currentPage = useCurrentPage(store).currentPage;
          var numberOfPages = useNumberOfPages(store).numberOfPages;
          React__namespace.useEffect(
            function () {
              return setEditingPage(''.concat(currentPage + 1));
            },
            [currentPage]
          );
          var gotoNextPage = function () {
            var nextPage = currentPage + 1;
            if (nextPage < numberOfPages) {
              setEditingPage(''.concat(nextPage + 1));
              jumpTo(nextPage);
            }
          };
          var gotoPreviousPage = function () {
            var previousPage = currentPage - 1;
            if (previousPage >= 0) {
              setEditingPage(''.concat(previousPage + 1));
              jumpTo(previousPage);
            }
          };
          var jumpTo = function (page) {
            var jumpToPage = store.get('jumpToPage');
            if (jumpToPage) {
              jumpToPage(page);
            }
          };
          var jump = function () {
            var newPage = parseInt(editingPage, 10);
            editingPage === '' || newPage < 1 || newPage > numberOfPages
              ? setEditingPage(''.concat(currentPage + 1))
              : jumpTo(newPage - 1);
          };
          var keydownPage = function (e) {
            switch (e.key) {
              case 'ArrowUp':
                gotoPreviousPage();
                break;
              case 'ArrowDown':
                gotoNextPage();
                break;
              case 'Enter':
                jump();
                break;
            }
          };
          var label =
            l10n && l10n.pageNavigation
              ? l10n.pageNavigation.enterPageNumber
              : 'Enter a page number';
          return React__namespace.createElement(
            'span',
            {
              className: 'rpv-page-navigation__current-page-input',
            },
            React__namespace.createElement(core.TextBox, {
              ariaLabel: label,
              testId: 'page-navigation__current-page-input',
              type: 'text',
              value: editingPage,
              onChange: setEditingPage,
              onKeyDown: keydownPage,
            })
          );
        };
        var FetchLabels = function (_a) {
          var children = _a.children,
            doc = _a.doc;
          var isMounted = core.useIsMounted();
          var _b = React__namespace.useState({
              loading: true,
              labels: [],
            }),
            status = _b[0],
            setStatus = _b[1];
          React__namespace.useEffect(
            function () {
              doc.getPageLabels().then(function (result) {
                isMounted.current &&
                  setStatus({
                    loading: false,
                    labels: result || [],
                  });
              });
            },
            [doc.loadingTask.docId]
          );
          return status.loading
            ? React__namespace.createElement(React__namespace.Fragment, null)
            : children(status.labels);
        };
        var useDocument = function (store) {
          var _a = React__namespace.useState(store.get('doc')),
            currentDoc = _a[0],
            setCurrentDoc = _a[1];
          var handleDocumentChanged = function (doc) {
            setCurrentDoc(doc);
          };
          React__namespace.useEffect(function () {
            store.subscribe('doc', handleDocumentChanged);
            return function () {
              store.unsubscribe('doc', handleDocumentChanged);
            };
          }, []);
          return currentDoc;
        };
        var CurrentPageLabel = function (_a) {
          var children = _a.children,
            store = _a.store;
          var currentDoc = useDocument(store);
          var currentPage = useCurrentPage(store).currentPage;
          var numberOfPages = useNumberOfPages(store).numberOfPages;
          var defaultChildren = function (props) {
            return React__namespace.createElement(
              React__namespace.Fragment,
              null,
              props.currentPage + 1
            );
          };
          var render = children || defaultChildren;
          return currentDoc
            ? React__namespace.createElement(
                FetchLabels,
                {
                  doc: currentDoc,
                },
                function (labels) {
                  var pageLabel =
                    labels.length === numberOfPages && numberOfPages > 0
                      ? labels[currentPage]
                      : '';
                  return render({
                    currentPage: currentPage,
                    numberOfPages: numberOfPages,
                    pageLabel: pageLabel,
                  });
                }
              )
            : React__namespace.createElement(React__namespace.Fragment, null);
        };
        var UpArrowIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M21.783,21.034H2.332c-0.552,0-1-0.448-1-1c0-0.182,0.05-0.361,0.144-0.517L11.2,3.448\n            c0.286-0.472,0.901-0.624,1.373-0.338c0.138,0.084,0.254,0.2,0.338,0.338l9.726,16.069c0.286,0.473,0.134,1.087-0.339,1.373\n            C22.143,20.984,21.965,21.034,21.783,21.034z',
            })
          );
        };
        var TOOLTIP_OFFSET$3 = {
          left: 0,
          top: 8,
        };
        var GoToFirstPageButton = function (_a) {
          var isDisabled = _a.isDisabled,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label =
            l10n && l10n.pageNavigation
              ? l10n.pageNavigation.goToFirstPage
              : 'First page';
          return React__namespace.createElement(core.Tooltip, {
            ariaControlsSuffix: 'page-navigation-first',
            position: core.Position.BottomCenter,
            target: React__namespace.createElement(
              core.MinimalButton,
              {
                ariaLabel: label,
                isDisabled: isDisabled,
                testId: 'page-navigation__first-button',
                onClick: onClick,
              },
              React__namespace.createElement(UpArrowIcon, null)
            ),
            content: function () {
              return label;
            },
            offset: TOOLTIP_OFFSET$3,
          });
        };
        var GoToFirstPage = function (_a) {
          var children = _a.children,
            store = _a.store;
          var currentPage = useCurrentPage(store).currentPage;
          var goToFirstPage = function () {
            var jumpToPage = store.get('jumpToPage');
            if (jumpToPage) {
              jumpToPage(0);
            }
          };
          var defaultChildren = function (props) {
            return React__namespace.createElement(GoToFirstPageButton, {
              isDisabled: props.isDisabled,
              onClick: props.onClick,
            });
          };
          var render = children || defaultChildren;
          return render({
            isDisabled: currentPage === 0,
            onClick: goToFirstPage,
          });
        };
        var GoToFirstPageMenuItem = function (_a) {
          var isDisabled = _a.isDisabled,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label =
            l10n && l10n.pageNavigation
              ? l10n.pageNavigation.goToFirstPage
              : 'First page';
          return React__namespace.createElement(
            core.MenuItem,
            {
              icon: React__namespace.createElement(UpArrowIcon, null),
              isDisabled: isDisabled,
              testId: 'page-navigation__first-menu',
              onClick: onClick,
            },
            label
          );
        };
        var TOOLTIP_OFFSET$2 = {
          left: 0,
          top: 8,
        };
        var GoToLastPageButton = function (_a) {
          var isDisabled = _a.isDisabled,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label =
            l10n && l10n.pageNavigation
              ? l10n.pageNavigation.goToLastPage
              : 'Last page';
          return React__namespace.createElement(core.Tooltip, {
            ariaControlsSuffix: 'page-navigation-last',
            position: core.Position.BottomCenter,
            target: React__namespace.createElement(
              core.MinimalButton,
              {
                ariaLabel: label,
                isDisabled: isDisabled,
                testId: 'page-navigation__last-button',
                onClick: onClick,
              },
              React__namespace.createElement(DownArrowIcon, null)
            ),
            content: function () {
              return label;
            },
            offset: TOOLTIP_OFFSET$2,
          });
        };
        var GoToLastPage = function (_a) {
          var children = _a.children,
            store = _a.store;
          var currentPage = useCurrentPage(store).currentPage;
          var numberOfPages = useNumberOfPages(store).numberOfPages;
          var goToLastPage = function () {
            var jumpToPage = store.get('jumpToPage');
            if (jumpToPage) {
              jumpToPage(numberOfPages - 1);
            }
          };
          var defaultChildren = function (props) {
            return React__namespace.createElement(GoToLastPageButton, {
              isDisabled: props.isDisabled,
              onClick: props.onClick,
            });
          };
          var render = children || defaultChildren;
          return render({
            isDisabled: currentPage + 1 >= numberOfPages,
            onClick: goToLastPage,
          });
        };
        var GoToLastPageMenuItem = function (_a) {
          var isDisabled = _a.isDisabled,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label =
            l10n && l10n.pageNavigation
              ? l10n.pageNavigation.goToLastPage
              : 'Last page';
          return React__namespace.createElement(
            core.MenuItem,
            {
              icon: React__namespace.createElement(DownArrowIcon, null),
              isDisabled: isDisabled,
              testId: 'page-navigation__last-menu',
              onClick: onClick,
            },
            label
          );
        };
        var TOOLTIP_OFFSET$1 = {
          left: 0,
          top: 8,
        };
        var GoToNextPageButton = function (_a) {
          var isDisabled = _a.isDisabled,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label =
            l10n && l10n.pageNavigation
              ? l10n.pageNavigation.goToNextPage
              : 'Next page';
          return React__namespace.createElement(core.Tooltip, {
            ariaControlsSuffix: 'page-navigation-next',
            position: core.Position.BottomCenter,
            target: React__namespace.createElement(
              core.MinimalButton,
              {
                ariaLabel: label,
                isDisabled: isDisabled,
                testId: 'page-navigation__next-button',
                onClick: onClick,
              },
              React__namespace.createElement(NextIcon, null)
            ),
            content: function () {
              return label;
            },
            offset: TOOLTIP_OFFSET$1,
          });
        };
        var GoToNextPage = function (_a) {
          var children = _a.children,
            store = _a.store;
          var currentPage = useCurrentPage(store).currentPage;
          var numberOfPages = useNumberOfPages(store).numberOfPages;
          var goToNextPage = function () {
            var jumpToNextPage = store.get('jumpToNextPage');
            if (jumpToNextPage) {
              jumpToNextPage();
            }
          };
          var defaultChildren = function (props) {
            return React__namespace.createElement(GoToNextPageButton, {
              onClick: props.onClick,
              isDisabled: props.isDisabled,
            });
          };
          var render = children || defaultChildren;
          return render({
            isDisabled: currentPage + 1 >= numberOfPages,
            onClick: goToNextPage,
          });
        };
        var GoToNextPageMenuItem = function (_a) {
          var isDisabled = _a.isDisabled,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label =
            l10n && l10n.pageNavigation
              ? l10n.pageNavigation.goToNextPage
              : 'Next page';
          return React__namespace.createElement(
            core.MenuItem,
            {
              icon: React__namespace.createElement(NextIcon, null),
              isDisabled: isDisabled,
              testId: 'page-navigation__next-menu',
              onClick: onClick,
            },
            label
          );
        };
        var PreviousIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M23.535,18.373L12.409,5.8c-0.183-0.207-0.499-0.226-0.706-0.043C11.688,5.77,11.674,5.785,11.66,5.8\n            L0.535,18.373',
            })
          );
        };
        var TOOLTIP_OFFSET = {
          left: 0,
          top: 8,
        };
        var GoToPreviousPageButton = function (_a) {
          var isDisabled = _a.isDisabled,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label =
            l10n && l10n.pageNavigation
              ? l10n.pageNavigation.goToPreviousPage
              : 'Previous page';
          return React__namespace.createElement(core.Tooltip, {
            ariaControlsSuffix: 'page-navigation-previous',
            position: core.Position.BottomCenter,
            target: React__namespace.createElement(
              core.MinimalButton,
              {
                ariaLabel: label,
                isDisabled: isDisabled,
                testId: 'page-navigation__previous-button',
                onClick: onClick,
              },
              React__namespace.createElement(PreviousIcon, null)
            ),
            content: function () {
              return label;
            },
            offset: TOOLTIP_OFFSET,
          });
        };
        var GoToPreviousPage = function (_a) {
          var store = _a.store,
            children = _a.children;
          var currentPage = useCurrentPage(store).currentPage;
          var goToPreviousPage = function () {
            var jumpToPreviousPage = store.get('jumpToPreviousPage');
            if (jumpToPreviousPage) {
              jumpToPreviousPage();
            }
          };
          var defaultChildren = function (props) {
            return React__namespace.createElement(GoToPreviousPageButton, {
              isDisabled: props.isDisabled,
              onClick: props.onClick,
            });
          };
          var render = children || defaultChildren;
          return render({
            isDisabled: currentPage <= 0,
            onClick: goToPreviousPage,
          });
        };
        var GoToPreviousPageMenuItem = function (_a) {
          var isDisabled = _a.isDisabled,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label =
            l10n && l10n.pageNavigation
              ? l10n.pageNavigation.goToPreviousPage
              : 'Previous page';
          return React__namespace.createElement(
            core.MenuItem,
            {
              icon: React__namespace.createElement(PreviousIcon, null),
              isDisabled: isDisabled,
              testId: 'page-navigation__previous-menu',
              onClick: onClick,
            },
            label
          );
        };
        var NumberOfPages = function (_a) {
          var children = _a.children,
            store = _a.store;
          var numberOfPages = useNumberOfPages(store).numberOfPages;
          return children
            ? children({
                numberOfPages: numberOfPages,
              })
            : React__namespace.createElement(
                React__namespace.Fragment,
                null,
                numberOfPages
              );
        };
        var ShortcutHandler = function (_a) {
          var containerRef = _a.containerRef,
            numPages = _a.numPages,
            store = _a.store;
          var currentPage = useCurrentPage(store).currentPage;
          var currentPageRef = React__namespace.useRef(currentPage);
          currentPageRef.current = currentPage;
          var isMouseInsideRef = React__namespace.useRef(false);
          var handleMouseEnter = function () {
            isMouseInsideRef.current = true;
          };
          var handleMouseLeave = function () {
            isMouseInsideRef.current = false;
          };
          var goToNextPage = function () {
            var jumpToPage = store.get('jumpToPage');
            var targetPage = currentPageRef.current + 1;
            if (jumpToPage && targetPage < numPages) {
              jumpToPage(targetPage);
            }
          };
          var goToPreviousPage = function () {
            var jumpToPage = store.get('jumpToPage');
            var targetPage = currentPageRef.current - 1;
            if (jumpToPage && targetPage >= 0) {
              jumpToPage(targetPage);
            }
          };
          var jumpToNextDestination = function () {
            var jumpToNextDestination = store.get('jumpToNextDestination');
            if (jumpToNextDestination) {
              jumpToNextDestination();
            }
          };
          var jumpToPreviousDestination = function () {
            var jumpToPreviousDestination = store.get(
              'jumpToPreviousDestination'
            );
            if (jumpToPreviousDestination) {
              jumpToPreviousDestination();
            }
          };
          var handleKeydown = function (e) {
            var containerEle = containerRef.current;
            var shouldHandleShortcuts =
              isMouseInsideRef.current ||
              (document.activeElement &&
                containerEle.contains(document.activeElement));
            if (!containerEle || !shouldHandleShortcuts) {
              return;
            }
            var shouldGoToNextPage =
              (e.altKey && e.key === 'ArrowDown') ||
              (!e.shiftKey && !e.altKey && e.key === 'PageDown');
            var shouldGoToPreviousPage =
              (e.altKey && e.key === 'ArrowUp') ||
              (!e.shiftKey && !e.altKey && e.key === 'PageUp');
            if (shouldGoToNextPage) {
              e.preventDefault();
              goToNextPage();
              return;
            }
            if (shouldGoToPreviousPage) {
              e.preventDefault();
              goToPreviousPage();
              return;
            }
            var isCommandPressed = core.isMac()
              ? e.metaKey && !e.ctrlKey
              : e.altKey;
            if (isCommandPressed) {
              switch (e.key) {
                case 'ArrowLeft':
                  e.preventDefault();
                  jumpToPreviousDestination();
                  break;
                case 'ArrowRight':
                  e.preventDefault();
                  jumpToNextDestination();
                  break;
              }
            }
          };
          React__namespace.useEffect(
            function () {
              var containerEle = containerRef.current;
              if (!containerEle) {
                return;
              }
              document.addEventListener('keydown', handleKeydown);
              containerEle.addEventListener('mouseenter', handleMouseEnter);
              containerEle.addEventListener('mouseleave', handleMouseLeave);
              return function () {
                document.removeEventListener('keydown', handleKeydown);
                containerEle.removeEventListener(
                  'mouseenter',
                  handleMouseEnter
                );
                containerEle.removeEventListener(
                  'mouseleave',
                  handleMouseLeave
                );
              };
            },
            [containerRef.current]
          );
          return React__namespace.createElement(
            React__namespace.Fragment,
            null
          );
        };
        var pageNavigationPlugin = function (props) {
          var pageNavigationPluginProps = React__namespace.useMemo(function () {
            return Object.assign(
              {},
              {
                enableShortcuts: true,
              },
              props
            );
          }, []);
          var store = React__namespace.useMemo(function () {
            return core.createStore();
          }, []);
          var CurrentPageInputDecorator = function () {
            return React__namespace.createElement(CurrentPageInput, {
              store: store,
            });
          };
          var CurrentPageLabelDecorator = function (props) {
            return React__namespace.createElement(
              CurrentPageLabel,
              __assign({}, props, {
                store: store,
              })
            );
          };
          var GoToFirstPageDecorator = function (props) {
            return React__namespace.createElement(
              GoToFirstPage,
              __assign({}, props, {
                store: store,
              })
            );
          };
          var GoToFirstPageButtonDecorator = function () {
            return React__namespace.createElement(
              GoToFirstPageDecorator,
              null,
              function (props) {
                return React__namespace.createElement(
                  GoToFirstPageButton,
                  __assign({}, props)
                );
              }
            );
          };
          var GoToFirstPageMenuItemDecorator = function (props) {
            return React__namespace.createElement(
              GoToFirstPageDecorator,
              null,
              function (p) {
                return React__namespace.createElement(GoToFirstPageMenuItem, {
                  isDisabled: p.isDisabled,
                  onClick: function () {
                    p.onClick();
                    props.onClick();
                  },
                });
              }
            );
          };
          var GoToLastPageDecorator = function (props) {
            return React__namespace.createElement(
              GoToLastPage,
              __assign({}, props, {
                store: store,
              })
            );
          };
          var GoToLastPageButtonDecorator = function () {
            return React__namespace.createElement(
              GoToLastPageDecorator,
              null,
              function (props) {
                return React__namespace.createElement(
                  GoToLastPageButton,
                  __assign({}, props)
                );
              }
            );
          };
          var GoToLastPageMenuItemDecorator = function (props) {
            return React__namespace.createElement(
              GoToLastPageDecorator,
              null,
              function (p) {
                return React__namespace.createElement(GoToLastPageMenuItem, {
                  isDisabled: p.isDisabled,
                  onClick: function () {
                    p.onClick();
                    props.onClick();
                  },
                });
              }
            );
          };
          var GoToNextPageDecorator = function (props) {
            return React__namespace.createElement(
              GoToNextPage,
              __assign({}, props, {
                store: store,
              })
            );
          };
          var GoToNextPageButtonDecorator = function () {
            return React__namespace.createElement(
              GoToNextPageDecorator,
              null,
              function (props) {
                return React__namespace.createElement(
                  GoToNextPageButton,
                  __assign({}, props)
                );
              }
            );
          };
          var GoToNextPageMenuItemDecorator = function (props) {
            return React__namespace.createElement(
              GoToNextPageDecorator,
              null,
              function (p) {
                return React__namespace.createElement(GoToNextPageMenuItem, {
                  isDisabled: p.isDisabled,
                  onClick: function () {
                    p.onClick();
                    props.onClick();
                  },
                });
              }
            );
          };
          var GoToPreviousPageDecorator = function (props) {
            return React__namespace.createElement(
              GoToPreviousPage,
              __assign({}, props, {
                store: store,
              })
            );
          };
          var GoToPreviousPageButtonDecorator = function () {
            return React__namespace.createElement(
              GoToPreviousPageDecorator,
              null,
              function (props) {
                return React__namespace.createElement(
                  GoToPreviousPageButton,
                  __assign({}, props)
                );
              }
            );
          };
          var GoToPreviousPageMenuItemDecorator = function (props) {
            return React__namespace.createElement(
              GoToPreviousPageDecorator,
              null,
              function (p) {
                return React__namespace.createElement(
                  GoToPreviousPageMenuItem,
                  {
                    isDisabled: p.isDisabled,
                    onClick: function () {
                      p.onClick();
                      props.onClick();
                    },
                  }
                );
              }
            );
          };
          var NumberOfPagesDecorator = function (props) {
            return React__namespace.createElement(
              NumberOfPages,
              __assign({}, props, {
                store: store,
              })
            );
          };
          var renderViewer = function (props) {
            var slot = props.slot;
            if (!pageNavigationPluginProps.enableShortcuts) {
              return slot;
            }
            var updateSlot = {
              children: React__namespace.createElement(
                React__namespace.Fragment,
                null,
                React__namespace.createElement(ShortcutHandler, {
                  containerRef: props.containerRef,
                  numPages: props.doc.numPages,
                  store: store,
                }),
                slot.children
              ),
            };
            return __assign(__assign({}, slot), updateSlot);
          };
          return {
            install: function (pluginFunctions) {
              store.update(
                'jumpToDestination',
                pluginFunctions.jumpToDestination
              );
              store.update(
                'jumpToNextDestination',
                pluginFunctions.jumpToNextDestination
              );
              store.update('jumpToNextPage', pluginFunctions.jumpToNextPage);
              store.update('jumpToPage', pluginFunctions.jumpToPage);
              store.update(
                'jumpToPreviousDestination',
                pluginFunctions.jumpToPreviousDestination
              );
              store.update(
                'jumpToPreviousPage',
                pluginFunctions.jumpToPreviousPage
              );
            },
            renderViewer: renderViewer,
            onDocumentLoad: function (props) {
              store.update('doc', props.doc);
              store.update('numberOfPages', props.doc.numPages);
            },
            onViewerStateChange: function (viewerState) {
              store.update('currentPage', viewerState.pageIndex);
              return viewerState;
            },
            jumpToNextPage: function () {
              var jump = store.get('jumpToNextPage');
              if (jump) {
                jump();
              }
            },
            jumpToPage: function (pageIndex) {
              var jumpTo = store.get('jumpToPage');
              if (jumpTo) {
                jumpTo(pageIndex);
              }
            },
            jumpToPreviousPage: function () {
              var jump = store.get('jumpToPreviousPage');
              if (jump) {
                jump();
              }
            },
            CurrentPageInput: CurrentPageInputDecorator,
            CurrentPageLabel: CurrentPageLabelDecorator,
            GoToFirstPage: GoToFirstPageDecorator,
            GoToFirstPageButton: GoToFirstPageButtonDecorator,
            GoToFirstPageMenuItem: GoToFirstPageMenuItemDecorator,
            GoToLastPage: GoToLastPageDecorator,
            GoToLastPageButton: GoToLastPageButtonDecorator,
            GoToLastPageMenuItem: GoToLastPageMenuItemDecorator,
            GoToNextPage: GoToNextPageDecorator,
            GoToNextPageButton: GoToNextPageButtonDecorator,
            GoToNextPageMenuItem: GoToNextPageMenuItemDecorator,
            GoToPreviousPage: GoToPreviousPageDecorator,
            GoToPreviousPageButton: GoToPreviousPageButtonDecorator,
            GoToPreviousPageMenuItem: GoToPreviousPageMenuItemDecorator,
            NumberOfPages: NumberOfPagesDecorator,
          };
        };
        exports.DownArrowIcon = DownArrowIcon;
        exports.NextIcon = NextIcon;
        exports.PreviousIcon = PreviousIcon;
        exports.UpArrowIcon = UpArrowIcon;
        exports.pageNavigationPlugin = pageNavigationPlugin;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/page-navigation/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/page-navigation/lib/cjs/page-navigation.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
  '[project]/node_modules/@react-pdf-viewer/print/lib/cjs/print.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/print/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        var reactDom = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        var getAllPagesNumbers = function (doc) {
          return Array(doc.numPages)
            .fill(0)
            .map(function (_, i) {
              return i;
            });
        };
        var generateRange = function (min, max) {
          return Array(max - min + 1)
            .fill(0)
            .map(function (_, i) {
              return min + i;
            });
        };
        var removeDuplicate = function (arr) {
          return arr.filter(function (i) {
            return arr.indexOf(i) === arr.lastIndexOf(i);
          });
        };
        var getCustomPagesNumbers = function (customPages) {
          return function (doc) {
            var results = [];
            customPages
              .replace(/\s+/g, '')
              .split(',')
              .forEach(function (part) {
                var range = part
                  .split('-')
                  .map(function (c) {
                    return parseInt(c, 10);
                  })
                  .filter(function (c) {
                    return Number.isInteger(c);
                  });
                if (range.length === 1) {
                  results.push(range[0] - 1);
                } else if (range.length === 2) {
                  results.push.apply(
                    results,
                    generateRange(range[0] - 1, range[1] - 1)
                  );
                }
              });
            return removeDuplicate(results).filter(function (i) {
              return i >= 0 && i < doc.numPages;
            });
          };
        };
        var getEvenPagesNumbers = function (doc) {
          return Array(doc.numPages)
            .fill(0)
            .map(function (_, i) {
              return i;
            })
            .filter(function (i) {
              return (i + 1) % 2 === 0;
            });
        };
        var getOddPagesNumbers = function (doc) {
          return Array(doc.numPages)
            .fill(0)
            .map(function (_, i) {
              return i;
            })
            .filter(function (i) {
              return (i + 1) % 2 === 1;
            });
        };
        var PrintIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M7.5,19.499h9 M7.5,16.499h9 M5.5,16.5h-3c-1.103-0.003-1.997-0.897-2-2v-6c0.003-1.103,0.897-1.997,2-2h19\n            c1.103,0.003,1.997,0.897,2,2v6c-0.003,1.103-0.897,1.997-2,2h-3\n            M5.5,4.5v-4h9.586c0.265,0,0.52,0.105,0.707,0.293l2.414,2.414\n            C18.395,3.394,18.5,3.649,18.5,3.914V4.5\n            M18.5,22.5c0,0.552-0.448,1-1,1h-11c-0.552,0-1-0.448-1-1v-9h13V22.5z\n            M3.5,8.499\n            c0.552,0,1,0.448,1,1s-0.448,1-1,1s-1-0.448-1-1S2.948,8.499,3.5,8.499z\n            M14.5,0.499v4h4',
            })
          );
        };
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign =
          function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var TOOLTIP_OFFSET = {
          left: 0,
          top: 8,
        };
        var PrintButton = function (_a) {
          var enableShortcuts = _a.enableShortcuts,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label = l10n && l10n.print ? l10n.print.print : 'Print';
          var ariaKeyShortcuts = enableShortcuts
            ? core.isMac()
              ? 'Meta+P'
              : 'Ctrl+P'
            : '';
          return React__namespace.createElement(core.Tooltip, {
            ariaControlsSuffix: 'print',
            position: core.Position.BottomCenter,
            target: React__namespace.createElement(
              core.MinimalButton,
              {
                ariaKeyShortcuts: ariaKeyShortcuts,
                ariaLabel: label,
                testId: 'print__button',
                onClick: onClick,
              },
              React__namespace.createElement(PrintIcon, null)
            ),
            content: function () {
              return label;
            },
            offset: TOOLTIP_OFFSET,
          });
        };
        var PrintStatus;
        (function (PrintStatus) {
          PrintStatus['CheckingPermission'] = 'CheckingPermission';
          PrintStatus['Inactive'] = 'Inactive';
          PrintStatus['Preparing'] = 'Preparing';
          PrintStatus['Cancelled'] = 'Cancelled';
          PrintStatus['Ready'] = 'Ready';
        })(PrintStatus || (PrintStatus = {}));
        var Print = function (_a) {
          var children = _a.children,
            enableShortcuts = _a.enableShortcuts,
            store = _a.store;
          var print = function () {
            store.update('printStatus', PrintStatus.CheckingPermission);
          };
          var render = children || PrintButton;
          return render({
            enableShortcuts: enableShortcuts,
            onClick: print,
          });
        };
        var PERMISSION_PRINT = 4;
        var PERMISSION_PRINT_HIGHT_QUALITY = 2048;
        var CheckPrintPermission = function (_a) {
          var doc = _a.doc,
            store = _a.store;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var _b = React__namespace.useState(true),
            isAllowed = _b[0],
            setIsAllowed = _b[1];
          React__namespace.useEffect(function () {
            doc.getPermissions().then(function (permissions) {
              var canPrint =
                permissions === null ||
                permissions.includes(PERMISSION_PRINT) ||
                permissions.includes(PERMISSION_PRINT_HIGHT_QUALITY);
              canPrint
                ? store.update('printStatus', PrintStatus.Preparing)
                : setIsAllowed(false);
            });
          }, []);
          return isAllowed
            ? React__namespace.createElement(React__namespace.Fragment, null)
            : React__namespace.createElement(core.Modal, {
                ariaControlsSuffix: 'print-permission',
                closeOnClickOutside: false,
                closeOnEscape: false,
                content: function (toggle) {
                  var close = function () {
                    toggle();
                    store.update('printStatus', PrintStatus.Cancelled);
                  };
                  return React__namespace.createElement(
                    React__namespace.Fragment,
                    null,
                    React__namespace.createElement(
                      'div',
                      {
                        className: 'rpv-print__permission-body',
                      },
                      l10n && l10n.print
                        ? l10n.print.disallowPrint
                        : 'The document does not allow to print'
                    ),
                    React__namespace.createElement(
                      'div',
                      {
                        className: 'rpv-print__permission-footer',
                      },
                      React__namespace.createElement(
                        core.Button,
                        {
                          onClick: close,
                        },
                        l10n && l10n.print ? l10n.print.close : 'Close'
                      )
                    )
                  );
                },
                isOpened: true,
              });
        };
        var PrintProgress = function (_a) {
          var numLoadedPages = _a.numLoadedPages,
            numPages = _a.numPages,
            onCancel = _a.onCancel;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var direction = React__namespace.useContext(
            core.ThemeContext
          ).direction;
          var isRtl = direction === core.TextDirection.RightToLeft;
          var progress = Math.floor((numLoadedPages * 100) / numPages);
          return React__namespace.createElement(
            'div',
            {
              className: 'rpv-print__progress',
            },
            React__namespace.createElement(
              'div',
              {
                className: core.classNames({
                  'rpv-print__progress-body': true,
                  'rpv-print__progress-body--rtl': isRtl,
                }),
              },
              React__namespace.createElement(
                'div',
                {
                  className: 'rpv-print__progress-message',
                },
                l10n && l10n.print
                  ? l10n.print.preparingDocument
                  : 'Preparing document ...'
              ),
              React__namespace.createElement(
                'div',
                {
                  className: 'rpv-print__progress-bar',
                },
                React__namespace.createElement(core.ProgressBar, {
                  progress: progress,
                })
              ),
              React__namespace.createElement(
                core.Button,
                {
                  onClick: onCancel,
                },
                l10n && l10n.print ? l10n.print.cancel : 'Cancel'
              )
            )
          );
        };
        var isRunningInJest = function () {
          return (
            typeof process !== 'undefined' &&
            process.env.JEST_WORKER_ID !== undefined
          );
        };
        var PageThumbnail = function (_a) {
          var canvas = _a.canvas,
            page = _a.page,
            pageHeight = _a.pageHeight,
            pageIndex = _a.pageIndex,
            pageWidth = _a.pageWidth,
            rotation = _a.rotation,
            onLoad = _a.onLoad;
          var isMounted = core.useIsMounted();
          var renderTask = React__namespace.useRef();
          var _b = React__namespace.useState(''),
            src = _b[0],
            setSrc = _b[1];
          var testWithJest = React__namespace.useMemo(function () {
            return isRunningInJest();
          }, []);
          var handleImageLoad = function () {
            if (!testWithJest) {
              onLoad();
            }
          };
          React__namespace.useEffect(function () {
            var task = renderTask.current;
            if (task) {
              task.cancel();
            }
            var printUnit = 150 / 72;
            canvas.height = Math.floor(pageHeight * printUnit);
            canvas.width = Math.floor(pageWidth * printUnit);
            var canvasContext = canvas.getContext('2d');
            canvasContext.save();
            canvasContext.fillStyle = 'rgb(255, 255, 255)';
            canvasContext.fillRect(0, 0, canvas.width, canvas.height);
            canvasContext.restore();
            var viewport = page.getViewport({
              rotation: rotation,
              scale: 1,
            });
            renderTask.current = page.render({
              canvasContext: canvasContext,
              intent: 'print',
              transform: [printUnit, 0, 0, printUnit, 0, 0],
              viewport: viewport,
            });
            renderTask.current.promise.then(
              function () {
                if ('toBlob' in canvas && 'createObjectURL' in URL) {
                  canvas.toBlob(function (blob) {
                    isMounted.current && setSrc(URL.createObjectURL(blob));
                    testWithJest && onLoad();
                  });
                } else {
                  isMounted.current && setSrc(canvas.toDataURL());
                  testWithJest && onLoad();
                }
              },
              function () {}
            );
          }, []);
          return (
            src &&
            React__namespace.createElement(
              'div',
              {
                className: 'rpv-print__page',
              },
              React__namespace.createElement('img', {
                'data-testid': 'print__thumbnail-'.concat(pageIndex),
                src: src,
                onLoad: handleImageLoad,
              })
            )
          );
        };
        var PageThumbnailContainer = function (_a) {
          var canvas = _a.canvas,
            doc = _a.doc,
            pageIndex = _a.pageIndex,
            pageRotation = _a.pageRotation,
            pageSize = _a.pageSize,
            rotation = _a.rotation,
            shouldRender = _a.shouldRender,
            onLoad = _a.onLoad;
          var isMounted = core.useIsMounted();
          var _b = React__namespace.useState(null),
            page = _b[0],
            setPage = _b[1];
          var isVertical = Math.abs(rotation + pageRotation) % 180 === 0;
          React__namespace.useEffect(
            function () {
              if (shouldRender) {
                core.getPage(doc, pageIndex).then(function (pdfPage) {
                  isMounted.current && setPage(pdfPage);
                });
              }
            },
            [shouldRender]
          );
          var rotationNumber =
            (pageSize.rotation + rotation + pageRotation) % 360;
          return (
            page &&
            React__namespace.createElement(PageThumbnail, {
              canvas: canvas,
              page: page,
              pageHeight: isVertical ? pageSize.pageHeight : pageSize.pageWidth,
              pageIndex: pageIndex,
              pageWidth: isVertical ? pageSize.pageWidth : pageSize.pageHeight,
              rotation: rotationNumber,
              onLoad: onLoad,
            })
          );
        };
        var PrintZone = function (_a) {
          var doc = _a.doc,
            numLoadedPages = _a.numLoadedPages,
            pagesRotation = _a.pagesRotation,
            pageSizes = _a.pageSizes,
            printPages = _a.printPages,
            printStatus = _a.printStatus,
            rotation = _a.rotation,
            onCancel = _a.onCancel,
            onLoad = _a.onLoad;
          var canvas = React__namespace.useMemo(function () {
            return document.createElement('canvas');
          }, []);
          var container = React__namespace.useMemo(function () {
            var zoneEle = document.querySelector('.rpv-print__zone');
            if (zoneEle) {
              return zoneEle;
            }
            var div = document.createElement('div');
            div.classList.add('rpv-print__zone');
            div.setAttribute('data-testid', 'print__zone');
            document.body.appendChild(div);
            return div;
          }, []);
          React__namespace.useEffect(
            function () {
              if (printStatus === PrintStatus.Ready) {
                document.documentElement.classList.add(
                  'rpv-print__html-printing'
                );
                document.body.classList.add('rpv-print__body-printing');
                window.print();
              }
              var handler = function () {
                if (printStatus === PrintStatus.Ready) {
                  document.documentElement.classList.remove(
                    'rpv-print__html-printing'
                  );
                  document.body.classList.remove('rpv-print__body-printing');
                  var zones = document.querySelectorAll('.rpv-print__zone');
                  if (zones) {
                    zones.forEach(function (zoneEle) {
                      zoneEle.parentElement.removeChild(zoneEle);
                    });
                  }
                  canvas.height = 0;
                  canvas.width = 0;
                  document.removeEventListener('mousemove', handler);
                  onCancel();
                }
              };
              document.addEventListener('mousemove', handler);
              return function () {
                return document.removeEventListener('mousemove', handler);
              };
            },
            [printStatus]
          );
          var pageHeight = pageSizes[0].pageHeight;
          var pageWidth = pageSizes[0].pageWidth;
          return reactDom.createPortal(
            React__namespace.createElement(
              React__namespace.Fragment,
              null,
              printPages.map(function (pageIndex, loopIndex) {
                return React__namespace.createElement(PageThumbnailContainer, {
                  key: pageIndex,
                  canvas: canvas,
                  doc: doc,
                  pageIndex: pageIndex,
                  pageRotation: pagesRotation.has(pageIndex)
                    ? pagesRotation.get(pageIndex)
                    : 0,
                  pageSize: pageSizes[pageIndex],
                  rotation: rotation,
                  shouldRender: loopIndex === numLoadedPages,
                  onLoad: onLoad,
                });
              }),
              React__namespace.createElement('style', {
                dangerouslySetInnerHTML: {
                  __html: '@page { size: '
                    .concat(pageWidth, 'pt ')
                    .concat(pageHeight, 'pt }'),
                },
              })
            ),
            container
          );
        };
        var PrintContainer = function (_a) {
          var doc = _a.doc,
            pagesRotation = _a.pagesRotation,
            pageSizes = _a.pageSizes,
            renderProgressBar = _a.renderProgressBar,
            rotation = _a.rotation,
            setPages = _a.setPages,
            store = _a.store;
          var _b = React__namespace.useState(PrintStatus.Inactive),
            printStatus = _b[0],
            setPrintStatus = _b[1];
          var _c = React__namespace.useState(0),
            numLoadedPagesForPrint = _c[0],
            setNumLoadedPagesForPrint = _c[1];
          var printPages = React__namespace.useMemo(
            function () {
              var numPages = doc.numPages;
              return setPages(doc).filter(function (index) {
                return index >= 0 && index < numPages;
              });
            },
            [doc, setPages]
          );
          var numPrintPages = printPages.length;
          var cancelPrinting = function () {
            setNumLoadedPagesForPrint(0);
            setPrintStatus(PrintStatus.Inactive);
          };
          var handlePrintStatus = function (status) {
            return setPrintStatus(status);
          };
          var onLoadPage = function () {
            var total = numLoadedPagesForPrint + 1;
            if (total <= numPrintPages) {
              setNumLoadedPagesForPrint(total);
              total === numPrintPages && setPrintStatus(PrintStatus.Ready);
            }
          };
          React__namespace.useEffect(function () {
            store.subscribe('printStatus', handlePrintStatus);
            return function () {
              store.unsubscribe('printStatus', handlePrintStatus);
            };
          }, []);
          return React__namespace.createElement(
            React__namespace.Fragment,
            null,
            printStatus === PrintStatus.CheckingPermission &&
              React__namespace.createElement(CheckPrintPermission, {
                doc: doc,
                store: store,
              }),
            printStatus === PrintStatus.Preparing &&
              (renderProgressBar
                ? renderProgressBar(
                    numLoadedPagesForPrint,
                    numPrintPages,
                    cancelPrinting
                  )
                : React__namespace.createElement(PrintProgress, {
                    numLoadedPages: numLoadedPagesForPrint,
                    numPages: numPrintPages,
                    onCancel: cancelPrinting,
                  })),
            (printStatus === PrintStatus.Preparing ||
              printStatus === PrintStatus.Ready) &&
              numLoadedPagesForPrint <= numPrintPages &&
              React__namespace.createElement(PrintZone, {
                doc: doc,
                numLoadedPages: numLoadedPagesForPrint,
                pagesRotation: pagesRotation,
                pageSizes: pageSizes,
                printPages: printPages,
                printStatus: printStatus,
                rotation: rotation,
                onCancel: cancelPrinting,
                onLoad: onLoadPage,
              })
          );
        };
        var PrintMenuItem = function (_a) {
          var onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label = l10n && l10n.print ? l10n.print.print : 'Print';
          return React__namespace.createElement(
            core.MenuItem,
            {
              icon: React__namespace.createElement(PrintIcon, null),
              testId: 'print__menu',
              onClick: onClick,
            },
            label
          );
        };
        var ShortcutHandler = function (_a) {
          var containerRef = _a.containerRef,
            store = _a.store;
          var keydownHandler = function (e) {
            if (e.shiftKey || e.altKey || e.key !== 'p') {
              return;
            }
            var isCommandPressed = core.isMac() ? e.metaKey : e.ctrlKey;
            if (!isCommandPressed) {
              return;
            }
            var containerEle = containerRef.current;
            if (
              !containerEle ||
              !document.activeElement ||
              !containerEle.contains(document.activeElement)
            ) {
              return;
            }
            e.preventDefault();
            store.update('printStatus', PrintStatus.Preparing);
          };
          React__namespace.useEffect(
            function () {
              var containerEle = containerRef.current;
              if (!containerEle) {
                return;
              }
              document.addEventListener('keydown', keydownHandler);
              return function () {
                document.removeEventListener('keydown', keydownHandler);
              };
            },
            [containerRef.current]
          );
          return React__namespace.createElement(
            React__namespace.Fragment,
            null
          );
        };
        var printPlugin = function (props) {
          var printPluginProps = React__namespace.useMemo(function () {
            return Object.assign(
              {},
              {
                enableShortcuts: true,
                setPages: function (doc) {
                  return Array(doc.numPages)
                    .fill(0)
                    .map(function (_, i) {
                      return i;
                    });
                },
              },
              props
            );
          }, []);
          var store = React__namespace.useMemo(function () {
            return core.createStore({
              printStatus: PrintStatus.Inactive,
            });
          }, []);
          var print = function () {
            store.update('printStatus', PrintStatus.CheckingPermission);
          };
          var PrintDecorator = function (props) {
            return React__namespace.createElement(
              Print,
              __assign(
                {
                  enableShortcuts: printPluginProps.enableShortcuts,
                },
                props,
                {
                  store: store,
                }
              )
            );
          };
          var PrintButtonDecorator = function () {
            return React__namespace.createElement(
              PrintDecorator,
              null,
              function (props) {
                return React__namespace.createElement(
                  PrintButton,
                  __assign({}, props)
                );
              }
            );
          };
          var PrintMenuItemDecorator = function (props) {
            return React__namespace.createElement(
              PrintDecorator,
              null,
              function (p) {
                return React__namespace.createElement(PrintMenuItem, {
                  onClick: function () {
                    p.onClick();
                    props.onClick();
                  },
                });
              }
            );
          };
          var renderViewer = function (renderViewerProps) {
            var slot = renderViewerProps.slot;
            var updateSlot = {
              children: React__namespace.createElement(
                React__namespace.Fragment,
                null,
                printPluginProps.enableShortcuts &&
                  React__namespace.createElement(ShortcutHandler, {
                    containerRef: renderViewerProps.containerRef,
                    store: store,
                  }),
                React__namespace.createElement(PrintContainer, {
                  doc: renderViewerProps.doc,
                  pagesRotation: renderViewerProps.pagesRotation,
                  pageSizes: renderViewerProps.pageSizes,
                  renderProgressBar:
                    props === null || props === void 0
                      ? void 0
                      : props.renderProgressBar,
                  rotation: renderViewerProps.rotation,
                  setPages: printPluginProps.setPages,
                  store: store,
                }),
                slot.children
              ),
            };
            return __assign(__assign({}, slot), updateSlot);
          };
          var setPages = function (printPages) {
            printPluginProps.setPages = printPages;
          };
          return {
            print: print,
            renderViewer: renderViewer,
            Print: PrintDecorator,
            PrintButton: PrintButtonDecorator,
            PrintMenuItem: PrintMenuItemDecorator,
            setPages: setPages,
          };
        };
        exports.PrintIcon = PrintIcon;
        exports.getAllPagesNumbers = getAllPagesNumbers;
        exports.getCustomPagesNumbers = getCustomPagesNumbers;
        exports.getEvenPagesNumbers = getEvenPagesNumbers;
        exports.getOddPagesNumbers = getOddPagesNumbers;
        exports.printPlugin = printPlugin;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/print/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/print/lib/cjs/print.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
  '[project]/node_modules/@react-pdf-viewer/properties/lib/cjs/properties.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/properties/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        var InfoIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M12,1.001c6.075,0,11,4.925,11,11s-4.925,11-11,11s-11-4.925-11-11S5.925,1.001,12,1.001z\n            M14.5,17.005H13\n            c-0.552,0-1-0.448-1-1v-6.5c0-0.276-0.224-0.5-0.5-0.5H10\n            M11.745,6.504L11.745,6.504\n            M11.745,6.5c-0.138,0-0.25,0.112-0.25,0.25\n            S11.607,7,11.745,7s0.25-0.112,0.25-0.25S11.883,6.5,11.745,6.5',
            })
          );
        };
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign =
          function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var PropertiesLoader = function (_a) {
          var doc = _a.doc,
            render = _a.render;
          var _b = React__namespace.useState(),
            data = _b[0],
            setData = _b[1];
          React__namespace.useEffect(function () {
            doc
              .getMetadata()
              .then(function (meta) {
                return Promise.resolve(meta);
              })
              .then(function (meta) {
                return doc.getDownloadInfo().then(function (d) {
                  return Promise.resolve({
                    fileName: meta.contentDispositionFilename || '',
                    info: meta.info,
                    length: d.length,
                  });
                });
              })
              .then(function (response) {
                setData(response);
              });
          }, []);
          return data
            ? render(data)
            : React__namespace.createElement(
                'div',
                {
                  className: 'rpv-properties__loader',
                },
                React__namespace.createElement(core.Spinner, null)
              );
        };
        var PropertyItem = function (_a) {
          var label = _a.label,
            value = _a.value;
          var direction = React__namespace.useContext(
            core.ThemeContext
          ).direction;
          var isRtl = direction === core.TextDirection.RightToLeft;
          return React__namespace.createElement(
            'dl',
            {
              className: core.classNames({
                'rpv-properties__item': true,
                'rpv-properties__item--rtl': isRtl,
              }),
            },
            React__namespace.createElement(
              'dt',
              {
                className: 'rpv-properties__item-label',
              },
              label,
              ':'
            ),
            React__namespace.createElement(
              'dd',
              {
                className: 'rpv-properties__item-value',
              },
              value || '-'
            )
          );
        };
        var dateRegex = new RegExp(
          '^D:' +
            '(\\d{4})' +
            '(\\d{2})?' +
            '(\\d{2})?' +
            '(\\d{2})?' +
            '(\\d{2})?' +
            '(\\d{2})?' +
            '([Z|+|-])?' +
            '(\\d{2})?' +
            "'?" +
            '(\\d{2})?' +
            "'?"
        );
        var parse = function (value, min, max, defaultValue) {
          var parsed = parseInt(value, 10);
          return parsed >= min && parsed <= max ? parsed : defaultValue;
        };
        var convertDate = function (input) {
          var matches = dateRegex.exec(input);
          if (!matches) {
            return null;
          }
          var year = parseInt(matches[1], 10);
          var month = parse(matches[2], 1, 12, 1) - 1;
          var day = parse(matches[3], 1, 31, 1);
          var hour = parse(matches[4], 0, 23, 0);
          var minute = parse(matches[5], 0, 59, 0);
          var second = parse(matches[6], 0, 59, 0);
          var universalTimeRelation = matches[7] || 'Z';
          var offsetHour = parse(matches[8], 0, 23, 0);
          var offsetMinute = parse(matches[9], 0, 59, 0);
          switch (universalTimeRelation) {
            case '-':
              hour += offsetHour;
              minute += offsetMinute;
              break;
            case '+':
              hour -= offsetHour;
              minute -= offsetMinute;
              break;
          }
          return new Date(Date.UTC(year, month, day, hour, minute, second));
        };
        var getFileName = function (url) {
          var str = url.split('/').pop();
          return str ? str.split('#')[0].split('?')[0] : url;
        };
        var getFileSize = function (bytes) {
          var sufixes = ['B', 'kB', 'MB', 'GB', 'TB'];
          var i = Math.floor(Math.log(bytes) / Math.log(1024));
          return ''
            .concat((bytes / Math.pow(1024, i)).toFixed(2), ' ')
            .concat(sufixes[i]);
        };
        var PropertiesModal = function (_a) {
          var doc = _a.doc,
            fileName = _a.fileName,
            onToggle = _a.onToggle;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var formatDate = function (input) {
            var date = convertDate(input);
            return date
              ? ''
                  .concat(date.toLocaleDateString(), ', ')
                  .concat(date.toLocaleTimeString())
              : '';
          };
          var renderData = function (data) {
            return React__namespace.createElement(
              React__namespace.Fragment,
              null,
              React__namespace.createElement(
                'div',
                {
                  className: 'rpv-properties__modal-section',
                },
                React__namespace.createElement(PropertyItem, {
                  label:
                    l10n && l10n.properties
                      ? l10n.properties.fileName
                      : 'File name',
                  value: data.fileName || getFileName(fileName),
                }),
                React__namespace.createElement(PropertyItem, {
                  label:
                    l10n && l10n.properties
                      ? l10n.properties.fileSize
                      : 'File size',
                  value: getFileSize(data.length),
                })
              ),
              React__namespace.createElement(core.Separator, null),
              React__namespace.createElement(
                'div',
                {
                  className: 'rpv-properties__modal-section',
                },
                React__namespace.createElement(PropertyItem, {
                  label:
                    l10n && l10n.properties ? l10n.properties.title : 'Title',
                  value: data.info.Title,
                }),
                React__namespace.createElement(PropertyItem, {
                  label:
                    l10n && l10n.properties ? l10n.properties.author : 'Author',
                  value: data.info.Author,
                }),
                React__namespace.createElement(PropertyItem, {
                  label:
                    l10n && l10n.properties
                      ? l10n.properties.subject
                      : 'Subject',
                  value: data.info.Subject,
                }),
                React__namespace.createElement(PropertyItem, {
                  label:
                    l10n && l10n.properties
                      ? l10n.properties.keywords
                      : 'Keywords',
                  value: data.info.Keywords,
                }),
                React__namespace.createElement(PropertyItem, {
                  label:
                    l10n && l10n.properties
                      ? l10n.properties.creator
                      : 'Creator',
                  value: data.info.Creator,
                }),
                React__namespace.createElement(PropertyItem, {
                  label:
                    l10n && l10n.properties
                      ? l10n.properties.creationDate
                      : 'Creation date',
                  value: formatDate(data.info.CreationDate),
                }),
                React__namespace.createElement(PropertyItem, {
                  label:
                    l10n && l10n.properties
                      ? l10n.properties.modificationDate
                      : 'Modification date',
                  value: formatDate(data.info.ModDate),
                })
              ),
              React__namespace.createElement(core.Separator, null),
              React__namespace.createElement(
                'div',
                {
                  className: 'rpv-properties__modal-section',
                },
                React__namespace.createElement(PropertyItem, {
                  label:
                    l10n && l10n.properties
                      ? l10n.properties.pdfProducer
                      : 'PDF producer',
                  value: data.info.Producer,
                }),
                React__namespace.createElement(PropertyItem, {
                  label:
                    l10n && l10n.properties
                      ? l10n.properties.pdfVersion
                      : 'PDF version',
                  value: data.info.PDFFormatVersion,
                }),
                React__namespace.createElement(PropertyItem, {
                  label:
                    l10n && l10n.properties
                      ? l10n.properties.pageCount
                      : 'Page count',
                  value: ''.concat(doc.numPages),
                })
              )
            );
          };
          return React__namespace.createElement(
            'div',
            {
              className: 'rpv-properties__modal',
            },
            React__namespace.createElement(PropertiesLoader, {
              doc: doc,
              render: renderData,
            }),
            React__namespace.createElement(
              'div',
              {
                className: 'rpv-properties__modal-footer',
              },
              React__namespace.createElement(
                core.Button,
                {
                  onClick: onToggle,
                },
                l10n && l10n.properties ? l10n.properties.close : 'Close'
              )
            )
          );
        };
        var TOOLTIP_OFFSET = {
          left: 0,
          top: 8,
        };
        var ShowPropertiesButton = function (_a) {
          var onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label =
            l10n && l10n.properties
              ? l10n.properties.showProperties
              : 'Show properties';
          return React__namespace.createElement(core.Tooltip, {
            ariaControlsSuffix: 'properties',
            position: core.Position.BottomCenter,
            target: React__namespace.createElement(
              core.MinimalButton,
              {
                ariaLabel: label,
                testId: 'properties__button',
                onClick: onClick,
              },
              React__namespace.createElement(InfoIcon, null)
            ),
            content: function () {
              return label;
            },
            offset: TOOLTIP_OFFSET,
          });
        };
        var useDocument = function (store) {
          var _a = React__namespace.useState(store.get('doc')),
            currentDoc = _a[0],
            setCurrentDoc = _a[1];
          var handleDocumentChanged = function (doc) {
            setCurrentDoc(doc);
          };
          React__namespace.useEffect(function () {
            store.subscribe('doc', handleDocumentChanged);
            return function () {
              store.unsubscribe('doc', handleDocumentChanged);
            };
          }, []);
          return {
            currentDoc: currentDoc,
          };
        };
        var ShowProperties = function (_a) {
          var children = _a.children,
            store = _a.store;
          var currentDoc = useDocument(store).currentDoc;
          var fileName = store.get('fileName') || '';
          var defaultChildren = function (props) {
            return React__namespace.createElement(
              ShowPropertiesButton,
              __assign({}, props)
            );
          };
          var render = children || defaultChildren;
          return currentDoc
            ? React__namespace.createElement(core.Modal, {
                ariaControlsSuffix: 'properties',
                target: function (toggle) {
                  return render({
                    onClick: toggle,
                  });
                },
                content: function (toggle) {
                  return React__namespace.createElement(PropertiesModal, {
                    doc: currentDoc,
                    fileName: fileName,
                    onToggle: toggle,
                  });
                },
                closeOnClickOutside: true,
                closeOnEscape: true,
              })
            : React__namespace.createElement(React__namespace.Fragment, null);
        };
        var ShowPropertiesMenuItem = function (_a) {
          var onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label =
            l10n && l10n.properties
              ? l10n.properties.showProperties
              : 'Show properties';
          return React__namespace.createElement(
            core.MenuItem,
            {
              icon: React__namespace.createElement(InfoIcon, null),
              testId: 'properties__menu',
              onClick: onClick,
            },
            label
          );
        };
        var propertiesPlugin = function () {
          var store = React__namespace.useMemo(function () {
            return core.createStore({
              fileName: '',
            });
          }, []);
          var ShowPropertiesDecorator = function (props) {
            return React__namespace.createElement(
              ShowProperties,
              __assign({}, props, {
                store: store,
              })
            );
          };
          var ShowPropertiesButtonDecorator = function () {
            return React__namespace.createElement(ShowProperties, {
              store: store,
            });
          };
          var ShowPropertiesMenuItemDecorator = function (props) {
            return React__namespace.createElement(
              ShowPropertiesDecorator,
              null,
              function (p) {
                return React__namespace.createElement(
                  ShowPropertiesMenuItem,
                  __assign({}, p)
                );
              }
            );
          };
          return {
            onDocumentLoad: function (props) {
              store.update('doc', props.doc);
            },
            onViewerStateChange: function (viewerState) {
              store.update('fileName', viewerState.file.name);
              return viewerState;
            },
            ShowProperties: ShowPropertiesDecorator,
            ShowPropertiesButton: ShowPropertiesButtonDecorator,
            ShowPropertiesMenuItem: ShowPropertiesMenuItemDecorator,
          };
        };
        exports.InfoIcon = InfoIcon;
        exports.propertiesPlugin = propertiesPlugin;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/properties/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/properties/lib/cjs/properties.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
  '[project]/node_modules/@react-pdf-viewer/rotate/lib/cjs/rotate.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/rotate/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        var RotateBackwardIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              ignoreDirection: true,
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M3.434,10.537c0.141-0.438,0.316-0.864,0.523-1.274\n            M3.069,14.425C3.023,14.053,3,13.679,3,13.305 c0-0.291,0.014-0.579,0.041-0.863\n            M4.389,18.111c-0.341-0.539-0.623-1.112-0.843-1.711\n            M7.163,20.9 c-0.543-0.345-1.048-0.747-1.506-1.2\n            M10.98,22.248c-0.65-0.074-1.29-0.218-1.909-0.431\n            M10,4.25h2 c4.987,0.015,9.017,4.069,9.003,9.055c-0.013,4.581-3.456,8.426-8.008,8.945\n            M13.5,1.75L10,4.25l3.5,2.5',
            })
          );
        };
        var RotateForwardIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              ignoreDirection: true,
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M20.566,10.537c-0.141-0.438-0.316-0.864-0.523-1.274\n            M20.931,14.425C20.977,14.053,21,13.679,21,13.305 c0-0.291-0.014-0.579-0.041-0.863\n            M19.611,18.111c0.341-0.539,0.624-1.114,0.843-1.713\n            M16.837,20.9 c0.543-0.345,1.048-0.747,1.506-1.2\n            M13.02,22.248c0.65-0.074,1.29-0.218,1.909-0.431\n            M14,4.25h-2 c-4.987,0.015-9.017,4.069-9.003,9.055c0.013,4.581,3.456,8.426,8.008,8.945\n            M10.5,1.75l3.5,2.5l-3.5,2.5',
            })
          );
        };
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign =
          function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var TOOLTIP_OFFSET = {
          left: 0,
          top: 8,
        };
        var RotateButton = function (_a) {
          var direction = _a.direction,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var backwardLabel =
            l10n && l10n.rotate
              ? l10n.rotate.rotateBackward
              : 'Rotate counterclockwise';
          var forwardLabel =
            l10n && l10n.rotate
              ? l10n.rotate.rotateForward
              : 'Rotate clockwise';
          var label =
            direction === core.RotateDirection.Backward
              ? backwardLabel
              : forwardLabel;
          var icon =
            direction === core.RotateDirection.Backward
              ? React__namespace.createElement(RotateBackwardIcon, null)
              : React__namespace.createElement(RotateForwardIcon, null);
          return React__namespace.createElement(core.Tooltip, {
            ariaControlsSuffix: 'rotate',
            position: core.Position.BottomCenter,
            target: React__namespace.createElement(
              core.MinimalButton,
              {
                ariaLabel: label,
                testId:
                  direction === core.RotateDirection.Backward
                    ? 'rotate__backward-button'
                    : 'rotate__forward-button',
                onClick: onClick,
              },
              icon
            ),
            content: function () {
              return label;
            },
            offset: TOOLTIP_OFFSET,
          });
        };
        var Rotate = function (_a) {
          var children = _a.children,
            direction = _a.direction,
            store = _a.store;
          var onClick = function () {
            var rotate = store.get('rotate');
            if (rotate) {
              rotate(direction);
            }
          };
          var defaultChildren = function (props) {
            return React__namespace.createElement(RotateButton, {
              direction: props.direction,
              onClick: props.onClick,
            });
          };
          var render = children || defaultChildren;
          return render({
            direction: direction,
            onClick: onClick,
          });
        };
        var RotateMenuItem = function (_a) {
          var direction = _a.direction,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var backwardLabel =
            l10n && l10n.rotate
              ? l10n.rotate.rotateBackward
              : 'Rotate counterclockwise';
          var forwardLabel =
            l10n && l10n.rotate
              ? l10n.rotate.rotateForward
              : 'Rotate clockwise';
          var label =
            direction === core.RotateDirection.Backward
              ? backwardLabel
              : forwardLabel;
          var icon =
            direction === core.RotateDirection.Backward
              ? React__namespace.createElement(RotateBackwardIcon, null)
              : React__namespace.createElement(RotateForwardIcon, null);
          return React__namespace.createElement(
            core.MenuItem,
            {
              icon: icon,
              testId:
                direction === core.RotateDirection.Backward
                  ? 'rotate__backward-menu'
                  : 'rotate__forward-menu',
              onClick: onClick,
            },
            label
          );
        };
        var RotatePage = function (_a) {
          var children = _a.children,
            store = _a.store;
          var onRotatePage = function (pageIndex, direction) {
            var rotatePage = store.get('rotatePage');
            if (rotatePage) {
              rotatePage(pageIndex, direction);
            }
          };
          return children({
            onRotatePage: onRotatePage,
          });
        };
        var rotatePlugin = function () {
          var store = React__namespace.useMemo(function () {
            return core.createStore();
          }, []);
          var RotateDecorator = function (props) {
            return React__namespace.createElement(
              Rotate,
              __assign({}, props, {
                store: store,
              })
            );
          };
          var RotateBackwardButtonDecorator = function () {
            return React__namespace.createElement(
              RotateDecorator,
              {
                direction: core.RotateDirection.Backward,
              },
              function (props) {
                return React__namespace.createElement(
                  RotateButton,
                  __assign({}, props)
                );
              }
            );
          };
          var RotateBackwardMenuItemDecorator = function (props) {
            return React__namespace.createElement(
              RotateDecorator,
              {
                direction: core.RotateDirection.Backward,
              },
              function (p) {
                return React__namespace.createElement(RotateMenuItem, {
                  direction: p.direction,
                  onClick: function () {
                    p.onClick();
                    props.onClick();
                  },
                });
              }
            );
          };
          var RotateForwardButtonDecorator = function () {
            return React__namespace.createElement(
              RotateDecorator,
              {
                direction: core.RotateDirection.Forward,
              },
              function (props) {
                return React__namespace.createElement(
                  RotateButton,
                  __assign({}, props)
                );
              }
            );
          };
          var RotateForwardMenuItemDecorator = function (props) {
            return React__namespace.createElement(
              RotateDecorator,
              {
                direction: core.RotateDirection.Forward,
              },
              function (p) {
                return React__namespace.createElement(RotateMenuItem, {
                  direction: p.direction,
                  onClick: function () {
                    p.onClick();
                    props.onClick();
                  },
                });
              }
            );
          };
          var RotatePageDecorator = function (props) {
            return React__namespace.createElement(
              RotatePage,
              __assign({}, props, {
                store: store,
              })
            );
          };
          return {
            install: function (pluginFunctions) {
              store.update('rotate', pluginFunctions.rotate);
              store.update('rotatePage', pluginFunctions.rotatePage);
            },
            Rotate: RotateDecorator,
            RotateBackwardButton: RotateBackwardButtonDecorator,
            RotateBackwardMenuItem: RotateBackwardMenuItemDecorator,
            RotateForwardButton: RotateForwardButtonDecorator,
            RotateForwardMenuItem: RotateForwardMenuItemDecorator,
            RotatePage: RotatePageDecorator,
          };
        };
        exports.RotateBackwardIcon = RotateBackwardIcon;
        exports.RotateForwardIcon = RotateForwardIcon;
        exports.rotatePlugin = rotatePlugin;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/rotate/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/rotate/lib/cjs/rotate.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
  '[project]/node_modules/@react-pdf-viewer/scroll-mode/lib/cjs/scroll-mode.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/scroll-mode/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        var DualPageCoverViewModeIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('rect', {
              x: '0.5',
              y: '0.497',
              width: '22',
              height: '22',
              rx: '1',
              ry: '1',
            }),
            React__namespace.createElement('line', {
              x1: '0.5',
              y1: '6.497',
              x2: '22.5',
              y2: '6.497',
            }),
            React__namespace.createElement('line', {
              x1: '11.5',
              y1: '6.497',
              x2: '11.5',
              y2: '22.497',
            })
          );
        };
        var DualPageViewModeIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('rect', {
              x: '0.5',
              y: '0.497',
              width: '22',
              height: '22',
              rx: '1',
              ry: '1',
            }),
            React__namespace.createElement('line', {
              x1: '11.5',
              y1: '0.497',
              x2: '11.5',
              y2: '22.497',
            })
          );
        };
        var HorizontalScrollingIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M6.5,21.5c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1V21.5z\n            M14.5,21.5c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1V21.5z\n            M22.5,21.5 c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1V21.5z',
            })
          );
        };
        var PageScrollingIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('rect', {
              x: '0.5',
              y: '0.497',
              width: '22',
              height: '22',
              rx: '1',
              ry: '1',
            })
          );
        };
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign =
          function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var switchScrollMode = function (store, scrollMode) {
          store.get('switchScrollMode')(scrollMode);
          var currentViewMode = store.get('viewMode');
          if (
            (scrollMode === core.ScrollMode.Horizontal ||
              scrollMode === core.ScrollMode.Wrapped) &&
            currentViewMode !== core.ViewMode.SinglePage
          ) {
            store.get('switchViewMode')(core.ViewMode.SinglePage);
          }
        };
        var VerticalScrollingIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M23.5,5.5c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h21c0.552,0,1,0.448,1,1V5.5z\n            M23.5,13.5c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h21c0.552,0,1,0.448,1,1V13.5z\n            M23.5,21.5 c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h21c0.552,0,1,0.448,1,1V21.5z',
            })
          );
        };
        var WrappedScrollingIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M10.5,9.5c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V9.5z\n            M23.5,9.5c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V9.5z\n            M10.5,22.5 c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V22.5z\n            M23.5,22.5c0,0.552-0.448,1-1,1 h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V22.5z',
            })
          );
        };
        var SwitchScrollModeDecorator = function (_a) {
          var children = _a.children,
            mode = _a.mode,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label = '';
          var icon = React__namespace.createElement(
            VerticalScrollingIcon,
            null
          );
          switch (mode) {
            case core.ScrollMode.Horizontal:
              label =
                l10n && l10n.scrollMode
                  ? l10n.scrollMode.horizontalScrolling
                  : 'Horizontal scrolling';
              icon = React__namespace.createElement(
                HorizontalScrollingIcon,
                null
              );
              break;
            case core.ScrollMode.Page:
              label =
                l10n && l10n.scrollMode
                  ? l10n.scrollMode.pageScrolling
                  : 'Page scrolling';
              icon = React__namespace.createElement(PageScrollingIcon, null);
              break;
            case core.ScrollMode.Wrapped:
              label =
                l10n && l10n.scrollMode
                  ? l10n.scrollMode.wrappedScrolling
                  : 'Wrapped scrolling';
              icon = React__namespace.createElement(WrappedScrollingIcon, null);
              break;
            case core.ScrollMode.Vertical:
            default:
              label =
                l10n && l10n.scrollMode
                  ? l10n.scrollMode.verticalScrolling
                  : 'Vertical scrolling';
              icon = React__namespace.createElement(
                VerticalScrollingIcon,
                null
              );
              break;
          }
          return children({
            icon: icon,
            label: label,
            onClick: onClick,
          });
        };
        var TOOLTIP_OFFSET$1 = {
          left: 0,
          top: 8,
        };
        var SwitchScrollModeButton = function (_a) {
          var isDisabled = _a.isDisabled,
            isSelected = _a.isSelected,
            mode = _a.mode,
            onClick = _a.onClick;
          var testId = '';
          switch (mode) {
            case core.ScrollMode.Horizontal:
              testId = 'scroll-mode__horizontal-button';
              break;
            case core.ScrollMode.Page:
              testId = 'scroll-mode__page-button';
              break;
            case core.ScrollMode.Wrapped:
              testId = 'scroll-mode__wrapped-button';
              break;
            case core.ScrollMode.Vertical:
            default:
              testId = 'scroll-mode__vertical-button';
              break;
          }
          return React__namespace.createElement(
            SwitchScrollModeDecorator,
            {
              mode: mode,
              onClick: onClick,
            },
            function (props) {
              return React__namespace.createElement(core.Tooltip, {
                ariaControlsSuffix: 'scroll-mode-switch',
                position: core.Position.BottomCenter,
                target: React__namespace.createElement(
                  core.MinimalButton,
                  {
                    ariaLabel: props.label,
                    isDisabled: isDisabled,
                    isSelected: isSelected,
                    testId: testId,
                    onClick: props.onClick,
                  },
                  props.icon
                ),
                content: function () {
                  return props.label;
                },
                offset: TOOLTIP_OFFSET$1,
              });
            }
          );
        };
        var useScrollMode = function (store) {
          var _a = React__namespace.useState(
              store.get('scrollMode') || core.ScrollMode.Vertical
            ),
            scrollMode = _a[0],
            setScrollMode = _a[1];
          var handleScrollModeChanged = function (currentScrollMode) {
            setScrollMode(currentScrollMode);
          };
          React__namespace.useEffect(function () {
            store.subscribe('scrollMode', handleScrollModeChanged);
            return function () {
              store.unsubscribe('scrollMode', handleScrollModeChanged);
            };
          }, []);
          return {
            scrollMode: scrollMode,
          };
        };
        var useViewMode = function (store) {
          var _a = React__namespace.useState(
              store.get('viewMode') || core.ViewMode.SinglePage
            ),
            viewMode = _a[0],
            setViewMode = _a[1];
          var handleViewModeChanged = function (currentViewMode) {
            setViewMode(currentViewMode);
          };
          React__namespace.useEffect(function () {
            store.subscribe('viewMode', handleViewModeChanged);
            return function () {
              store.unsubscribe('viewMode', handleViewModeChanged);
            };
          }, []);
          return {
            viewMode: viewMode,
          };
        };
        var SwitchScrollMode = function (_a) {
          var children = _a.children,
            mode = _a.mode,
            store = _a.store;
          var viewMode = useViewMode(store).viewMode;
          var scrollMode = useScrollMode(store).scrollMode;
          var onClick = function () {
            switchScrollMode(store, mode);
          };
          var isSelected = scrollMode === mode;
          var isDisabled =
            (mode === core.ScrollMode.Horizontal ||
              mode === core.ScrollMode.Wrapped) &&
            viewMode !== core.ViewMode.SinglePage;
          var defaultChildren = function (props) {
            return React__namespace.createElement(SwitchScrollModeButton, {
              isDisabled: isDisabled,
              isSelected: isSelected,
              mode: props.mode,
              onClick: props.onClick,
            });
          };
          var render = children || defaultChildren;
          return render({
            isDisabled: isDisabled,
            isSelected: isSelected,
            mode: mode,
            onClick: onClick,
          });
        };
        var SwitchScrollModeMenuItem = function (_a) {
          var isDisabled = _a.isDisabled,
            isSelected = _a.isSelected,
            mode = _a.mode,
            onClick = _a.onClick;
          var testId = '';
          switch (mode) {
            case core.ScrollMode.Horizontal:
              testId = 'scroll-mode__horizontal-menu';
              break;
            case core.ScrollMode.Page:
              testId = 'scroll-mode__page-menu';
              break;
            case core.ScrollMode.Wrapped:
              testId = 'scroll-mode__wrapped-menu';
              break;
            case core.ScrollMode.Vertical:
            default:
              testId = 'scroll-mode__vertical-menu';
              break;
          }
          return React__namespace.createElement(
            SwitchScrollModeDecorator,
            {
              mode: mode,
              onClick: onClick,
            },
            function (props) {
              return React__namespace.createElement(
                core.MenuItem,
                {
                  checked: isSelected,
                  icon: props.icon,
                  isDisabled: isDisabled,
                  testId: testId,
                  onClick: props.onClick,
                },
                props.label
              );
            }
          );
        };
        var switchViewMode = function (store, viewMode) {
          store.get('switchViewMode')(viewMode);
          var currentScrollMode = store.get('scrollMode');
          if (
            (currentScrollMode === core.ScrollMode.Horizontal ||
              currentScrollMode === core.ScrollMode.Wrapped) &&
            viewMode !== core.ViewMode.SinglePage
          ) {
            store.get('switchScrollMode')(core.ScrollMode.Vertical);
          }
        };
        var SwitchViewModeDecorator = function (_a) {
          var children = _a.children,
            mode = _a.mode,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label = '';
          var icon = React__namespace.createElement(PageScrollingIcon, null);
          switch (mode) {
            case core.ViewMode.DualPage:
              label =
                l10n && l10n.scrollMode
                  ? l10n.scrollMode.dualPage
                  : 'Dual page';
              icon = React__namespace.createElement(DualPageViewModeIcon, null);
              break;
            case core.ViewMode.DualPageWithCover:
              label =
                l10n && l10n.scrollMode
                  ? l10n.scrollMode.dualPageCover
                  : 'Dual page with cover';
              icon = React__namespace.createElement(
                DualPageCoverViewModeIcon,
                null
              );
              break;
            case core.ViewMode.SinglePage:
            default:
              label =
                l10n && l10n.scrollMode
                  ? l10n.scrollMode.singlePage
                  : 'Single page';
              icon = React__namespace.createElement(PageScrollingIcon, null);
              break;
          }
          return children({
            icon: icon,
            label: label,
            onClick: onClick,
          });
        };
        var TOOLTIP_OFFSET = {
          left: 0,
          top: 8,
        };
        var SwitchViewModeButton = function (_a) {
          var isDisabled = _a.isDisabled,
            isSelected = _a.isSelected,
            mode = _a.mode,
            onClick = _a.onClick;
          var testId = '';
          switch (mode) {
            case core.ViewMode.DualPage:
              testId = 'view-mode__dual-button';
              break;
            case core.ViewMode.DualPageWithCover:
              testId = 'view-mode__dual-cover-button';
              break;
            case core.ViewMode.SinglePage:
            default:
              testId = 'view-mode__single-button';
              break;
          }
          return React__namespace.createElement(
            SwitchViewModeDecorator,
            {
              mode: mode,
              onClick: onClick,
            },
            function (props) {
              return React__namespace.createElement(core.Tooltip, {
                ariaControlsSuffix: 'view-mode-switch',
                position: core.Position.BottomCenter,
                target: React__namespace.createElement(
                  core.MinimalButton,
                  {
                    ariaLabel: props.label,
                    isDisabled: isDisabled,
                    isSelected: isSelected,
                    testId: testId,
                    onClick: props.onClick,
                  },
                  props.icon
                ),
                content: function () {
                  return props.label;
                },
                offset: TOOLTIP_OFFSET,
              });
            }
          );
        };
        var SwitchViewMode = function (_a) {
          var children = _a.children,
            mode = _a.mode,
            store = _a.store;
          var viewMode = useViewMode(store).viewMode;
          var scrollMode = useScrollMode(store).scrollMode;
          var onClick = function () {
            switchViewMode(store, mode);
          };
          var isSelected = viewMode === mode;
          var isDisabled =
            (scrollMode === core.ScrollMode.Horizontal ||
              scrollMode === core.ScrollMode.Wrapped) &&
            mode !== core.ViewMode.SinglePage;
          var defaultChildren = function (props) {
            return React__namespace.createElement(SwitchViewModeButton, {
              isDisabled: isDisabled,
              isSelected: isSelected,
              mode: props.mode,
              onClick: props.onClick,
            });
          };
          var render = children || defaultChildren;
          return render({
            isDisabled: isDisabled,
            isSelected: isSelected,
            mode: mode,
            onClick: onClick,
          });
        };
        var SwitchViewModeMenuItem = function (_a) {
          var isDisabled = _a.isDisabled,
            isSelected = _a.isSelected,
            mode = _a.mode,
            onClick = _a.onClick;
          var testId = '';
          switch (mode) {
            case core.ViewMode.DualPage:
              testId = 'view-mode__dual-menu';
              break;
            case core.ViewMode.DualPageWithCover:
              testId = 'view-mode__dual-cover-menu';
              break;
            case core.ViewMode.SinglePage:
            default:
              testId = 'view-mode__single-menu';
              break;
          }
          return React__namespace.createElement(
            SwitchViewModeDecorator,
            {
              mode: mode,
              onClick: onClick,
            },
            function (props) {
              return React__namespace.createElement(
                core.MenuItem,
                {
                  checked: isSelected,
                  icon: props.icon,
                  isDisabled: isDisabled,
                  testId: testId,
                  onClick: props.onClick,
                },
                props.label
              );
            }
          );
        };
        var scrollModePlugin = function () {
          var store = React__namespace.useMemo(function () {
            return core.createStore({
              scrollMode: core.ScrollMode.Vertical,
              viewMode: core.ViewMode.SinglePage,
              switchScrollMode: function () {},
              switchViewMode: function () {},
            });
          }, []);
          var SwitchScrollModeDecorator = function (props) {
            return React__namespace.createElement(
              SwitchScrollMode,
              __assign({}, props, {
                store: store,
              })
            );
          };
          var SwitchScrollModeButtonDecorator = function (props) {
            return React__namespace.createElement(
              SwitchScrollModeDecorator,
              {
                mode: props.mode,
              },
              function (p) {
                return React__namespace.createElement(SwitchScrollModeButton, {
                  isDisabled: p.isDisabled,
                  isSelected: p.isSelected,
                  mode: p.mode,
                  onClick: function () {
                    p.onClick();
                  },
                });
              }
            );
          };
          var SwitchScrollModeMenuItemDecorator = function (props) {
            return React__namespace.createElement(
              SwitchScrollModeDecorator,
              {
                mode: props.mode,
              },
              function (p) {
                return React__namespace.createElement(
                  SwitchScrollModeMenuItem,
                  {
                    isDisabled: p.isDisabled,
                    isSelected: p.isSelected,
                    mode: p.mode,
                    onClick: function () {
                      p.onClick();
                      props.onClick();
                    },
                  }
                );
              }
            );
          };
          var SwitchViewModeDecorator = function (props) {
            return React__namespace.createElement(
              SwitchViewMode,
              __assign({}, props, {
                store: store,
              })
            );
          };
          var SwitchViewModeButtonDecorator = function (props) {
            return React__namespace.createElement(
              SwitchViewModeDecorator,
              {
                mode: props.mode,
              },
              function (p) {
                return React__namespace.createElement(SwitchViewModeButton, {
                  isDisabled: p.isDisabled,
                  isSelected: p.isSelected,
                  mode: p.mode,
                  onClick: function () {
                    p.onClick();
                  },
                });
              }
            );
          };
          var SwitchViewModeMenuItemDecorator = function (props) {
            return React__namespace.createElement(
              SwitchViewModeDecorator,
              {
                mode: props.mode,
              },
              function (p) {
                return React__namespace.createElement(SwitchViewModeMenuItem, {
                  isDisabled: p.isDisabled,
                  isSelected: p.isSelected,
                  mode: p.mode,
                  onClick: function () {
                    p.onClick();
                    props.onClick();
                  },
                });
              }
            );
          };
          return {
            install: function (pluginFunctions) {
              store.update(
                'switchScrollMode',
                pluginFunctions.switchScrollMode
              );
              store.update('switchViewMode', pluginFunctions.switchViewMode);
            },
            onViewerStateChange: function (viewerState) {
              store.update('scrollMode', viewerState.scrollMode);
              store.update('viewMode', viewerState.viewMode);
              return viewerState;
            },
            switchScrollMode: function (scrollMode) {
              switchScrollMode(store, scrollMode);
            },
            switchViewMode: function (viewMode) {
              switchViewMode(store, viewMode);
            },
            SwitchScrollMode: SwitchScrollModeDecorator,
            SwitchScrollModeButton: SwitchScrollModeButtonDecorator,
            SwitchScrollModeMenuItem: SwitchScrollModeMenuItemDecorator,
            SwitchViewMode: SwitchViewModeDecorator,
            SwitchViewModeButton: SwitchViewModeButtonDecorator,
            SwitchViewModeMenuItem: SwitchViewModeMenuItemDecorator,
          };
        };
        exports.DualPageCoverViewModeIcon = DualPageCoverViewModeIcon;
        exports.DualPageViewModeIcon = DualPageViewModeIcon;
        exports.HorizontalScrollingIcon = HorizontalScrollingIcon;
        exports.PageScrollingIcon = PageScrollingIcon;
        exports.VerticalScrollingIcon = VerticalScrollingIcon;
        exports.WrappedScrollingIcon = WrappedScrollingIcon;
        exports.scrollModePlugin = scrollModePlugin;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/scroll-mode/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/scroll-mode/lib/cjs/scroll-mode.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
  '[project]/node_modules/@react-pdf-viewer/search/lib/cjs/search.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/search/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        var NextIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M0.541,5.627L11.666,18.2c0.183,0.207,0.499,0.226,0.706,0.043c0.015-0.014,0.03-0.028,0.043-0.043\n            L23.541,5.627',
            })
          );
        };
        var PreviousIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M23.535,18.373L12.409,5.8c-0.183-0.207-0.499-0.226-0.706-0.043C11.688,5.77,11.674,5.785,11.66,5.8\n            L0.535,18.373',
            })
          );
        };
        var SearchIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              ignoreDirection: true,
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M10.5,0.5c5.523,0,10,4.477,10,10s-4.477,10-10,10s-10-4.477-10-10S4.977,0.5,10.5,0.5z\n            M23.5,23.5\n            l-5.929-5.929',
            })
          );
        };
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign =
          function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var EMPTY_KEYWORD_REGEXP = {
          keyword: '',
          regExp: new RegExp(' '),
          wholeWords: false,
        };
        var calculateOffset = function (children, parent) {
          var top = children.offsetTop;
          var left = children.offsetLeft;
          var p = children.parentElement;
          while (p && p !== parent) {
            top += p.offsetTop;
            left += p.offsetLeft;
            p = p.parentElement;
          }
          return {
            left: left,
            top: top,
          };
        };
        var getCssProperties = function (area) {
          return {
            left: ''.concat(area.left, '%'),
            top: ''.concat(area.top, '%'),
            height: ''.concat(area.height, '%'),
            width: ''.concat(area.width, '%'),
          };
        };
        var HightlightItem = function (_a) {
          var index = _a.index,
            area = _a.area,
            onHighlightKeyword = _a.onHighlightKeyword;
          var containerRef = React__namespace.useRef();
          core.useIsomorphicLayoutEffect(function () {
            var highlightEle = containerRef.current;
            if (onHighlightKeyword && highlightEle) {
              onHighlightKeyword({
                highlightEle: highlightEle,
                keyword: area.keyword,
              });
            }
          }, []);
          return React__namespace.createElement('div', {
            className: 'rpv-search__highlight',
            'data-index': index,
            ref: containerRef,
            style: getCssProperties(area),
            title: area.keywordStr.trim(),
          });
        };
        var removeNode = function (ele) {
          var parent = ele.parentNode;
          if (parent) {
            parent.removeChild(ele);
          }
        };
        var replaceNode = function (replacementNode, node) {
          removeNode(replacementNode);
          var parent = node.parentNode;
          if (parent) {
            parent.insertBefore(replacementNode, node);
          }
          removeNode(node);
        };
        var unwrap = function (ele) {
          var parent = ele.parentNode;
          if (!parent) {
            return;
          }
          var range = document.createRange();
          range.selectNodeContents(ele);
          replaceNode(range.extractContents(), ele);
          parent.normalize();
        };
        var sortHighlightPosition = function (a, b) {
          if (a.top < b.top) {
            return -1;
          }
          if (a.top > b.top) {
            return 1;
          }
          if (a.left < b.left) {
            return -1;
          }
          if (a.left > b.left) {
            return 1;
          }
          return 0;
        };
        var Highlights = function (_a) {
          var numPages = _a.numPages,
            pageIndex = _a.pageIndex,
            renderHighlights = _a.renderHighlights,
            store = _a.store,
            onHighlightKeyword = _a.onHighlightKeyword;
          var containerRef = React__namespace.useRef();
          var defaultRenderHighlights = React__namespace.useCallback(function (
            renderProps
          ) {
            return React__namespace.createElement(
              React__namespace.Fragment,
              null,
              renderProps.highlightAreas.map(function (area, index) {
                return React__namespace.createElement(HightlightItem, {
                  index: index,
                  key: index,
                  area: area,
                  onHighlightKeyword: onHighlightKeyword,
                });
              })
            );
          }, []);
          var renderHighlightElements =
            renderHighlights || defaultRenderHighlights;
          var _b = React__namespace.useState(store.get('matchPosition')),
            matchPosition = _b[0],
            setMatchPosition = _b[1];
          var _c = React__namespace.useState(
              store.get('keyword') || [EMPTY_KEYWORD_REGEXP]
            ),
            keywordRegexp = _c[0],
            setKeywordRegexp = _c[1];
          var _d = React__namespace.useState({
              pageIndex: pageIndex,
              scale: 1,
              status: core.LayerRenderStatus.PreRender,
            }),
            renderStatus = _d[0],
            setRenderStatus = _d[1];
          var currentMatchRef = React__namespace.useRef(null);
          var characterIndexesRef = React__namespace.useRef([]);
          var _e = React__namespace.useState([]),
            highlightAreas = _e[0],
            setHighlightAreas = _e[1];
          var defaultTargetPageFilter = function () {
            return true;
          };
          var targetPageFilter = React__namespace.useCallback(
            function () {
              return store.get('targetPageFilter') || defaultTargetPageFilter;
            },
            [store.get('targetPageFilter')]
          );
          var highlight = function (
            keywordStr,
            keyword,
            textLayerEle,
            span,
            charIndexSpan
          ) {
            var range = document.createRange();
            var firstChild = span.firstChild;
            if (!firstChild || firstChild.nodeType !== Node.TEXT_NODE) {
              return null;
            }
            var length = firstChild.textContent.length;
            var startOffset = charIndexSpan[0].charIndexInSpan;
            var endOffset =
              charIndexSpan.length === 1
                ? startOffset
                : charIndexSpan[charIndexSpan.length - 1].charIndexInSpan;
            if (startOffset > length || endOffset + 1 > length) {
              return null;
            }
            range.setStart(firstChild, startOffset);
            range.setEnd(firstChild, endOffset + 1);
            var wrapper = document.createElement('span');
            range.surroundContents(wrapper);
            var wrapperRect = wrapper.getBoundingClientRect();
            var textLayerRect = textLayerEle.getBoundingClientRect();
            var pageHeight = textLayerRect.height;
            var pageWidth = textLayerRect.width;
            var left =
              (100 * (wrapperRect.left - textLayerRect.left)) / pageWidth;
            var top =
              (100 * (wrapperRect.top - textLayerRect.top)) / pageHeight;
            var height = (100 * wrapperRect.height) / pageHeight;
            var width = (100 * wrapperRect.width) / pageWidth;
            unwrap(wrapper);
            return {
              keyword: keyword,
              keywordStr: keywordStr,
              numPages: numPages,
              pageIndex: pageIndex,
              left: left,
              top: top,
              height: height,
              width: width,
              pageHeight: pageHeight,
              pageWidth: pageWidth,
            };
          };
          var highlightAll = function (textLayerEle) {
            var charIndexes = characterIndexesRef.current;
            if (charIndexes.length === 0) {
              return [];
            }
            var highlightPos = [];
            var spans = [].slice.call(
              textLayerEle.querySelectorAll('.rpv-core__text-layer-text')
            );
            var fullText = charIndexes
              .map(function (item) {
                return item.char;
              })
              .join('');
            keywordRegexp.forEach(function (keyword) {
              var keywordStr = keyword.keyword;
              if (!keywordStr.trim()) {
                return;
              }
              var cloneKeyword =
                keyword.regExp.flags.indexOf('g') === -1
                  ? new RegExp(
                      keyword.regExp,
                      ''.concat(keyword.regExp.flags, 'g')
                    )
                  : keyword.regExp;
              var match;
              var matches = [];
              while ((match = cloneKeyword.exec(fullText)) !== null) {
                matches.push({
                  keyword: cloneKeyword,
                  startIndex: match.index,
                  endIndex: cloneKeyword.lastIndex,
                });
              }
              matches
                .map(function (item) {
                  return {
                    keyword: item.keyword,
                    indexes: charIndexes.slice(item.startIndex, item.endIndex),
                  };
                })
                .forEach(function (item) {
                  var spanIndexes = item.indexes.reduce(function (acc, item) {
                    acc[item.spanIndex] = (acc[item.spanIndex] || []).concat([
                      item,
                    ]);
                    return acc;
                  }, {});
                  Object.values(spanIndexes).forEach(function (charIndexSpan) {
                    if (
                      charIndexSpan.length !== 1 ||
                      charIndexSpan[0].char.trim() !== ''
                    ) {
                      var normalizedCharSpan = keyword.wholeWords
                        ? charIndexSpan.slice(1, -1)
                        : charIndexSpan;
                      var hightlighPosition = highlight(
                        keywordStr,
                        item.keyword,
                        textLayerEle,
                        spans[normalizedCharSpan[0].spanIndex],
                        normalizedCharSpan
                      );
                      if (hightlighPosition) {
                        highlightPos.push(hightlighPosition);
                      }
                    }
                  });
                });
            });
            return highlightPos.sort(sortHighlightPosition);
          };
          var handleKeywordChanged = function (keyword) {
            if (keyword && keyword.length > 0) {
              setKeywordRegexp(keyword);
            }
          };
          var handleMatchPositionChanged = function (currentPosition) {
            return setMatchPosition(currentPosition);
          };
          var handleRenderStatusChanged = function (status) {
            if (!status.has(pageIndex)) {
              return;
            }
            var currentStatus = status.get(pageIndex);
            if (currentStatus) {
              setRenderStatus({
                ele: currentStatus.ele,
                pageIndex: pageIndex,
                scale: currentStatus.scale,
                status: currentStatus.status,
              });
            }
          };
          var isEmptyKeyword = function () {
            return (
              keywordRegexp.length === 0 ||
              (keywordRegexp.length === 1 &&
                keywordRegexp[0].keyword.trim() === '')
            );
          };
          React__namespace.useEffect(
            function () {
              if (
                isEmptyKeyword() ||
                renderStatus.status !== core.LayerRenderStatus.DidRender ||
                characterIndexesRef.current.length
              ) {
                return;
              }
              var textLayerEle = renderStatus.ele;
              var spans = [].slice.call(
                textLayerEle.querySelectorAll('.rpv-core__text-layer-text')
              );
              var charIndexes = spans
                .map(function (span) {
                  return span.textContent;
                })
                .reduce(
                  function (prev, curr, index) {
                    return prev.concat(
                      curr.split('').map(function (c, i) {
                        return {
                          char: c,
                          charIndexInSpan: i,
                          spanIndex: index,
                        };
                      })
                    );
                  },
                  [
                    {
                      char: '',
                      charIndexInSpan: 0,
                      spanIndex: 0,
                    },
                  ]
                )
                .slice(1);
              characterIndexesRef.current = charIndexes;
            },
            [keywordRegexp, renderStatus.status]
          );
          React__namespace.useEffect(
            function () {
              if (
                isEmptyKeyword() ||
                !renderStatus.ele ||
                renderStatus.status !== core.LayerRenderStatus.DidRender ||
                !targetPageFilter()({
                  pageIndex: pageIndex,
                  numPages: numPages,
                })
              ) {
                return;
              }
              var textLayerEle = renderStatus.ele;
              var highlightPos = highlightAll(textLayerEle);
              setHighlightAreas(highlightPos);
            },
            [
              keywordRegexp,
              matchPosition,
              renderStatus.status,
              characterIndexesRef.current,
            ]
          );
          React__namespace.useEffect(
            function () {
              if (
                isEmptyKeyword() &&
                renderStatus.ele &&
                renderStatus.status === core.LayerRenderStatus.DidRender
              ) {
                setHighlightAreas([]);
              }
            },
            [keywordRegexp, renderStatus.status]
          );
          React__namespace.useEffect(
            function () {
              if (highlightAreas.length === 0) {
                return;
              }
              var container = containerRef.current;
              if (
                matchPosition.pageIndex !== pageIndex ||
                !container ||
                renderStatus.status !== core.LayerRenderStatus.DidRender
              ) {
                return;
              }
              var highlightEle = container.querySelector(
                '.rpv-search__highlight[data-index="'.concat(
                  matchPosition.matchIndex,
                  '"]'
                )
              );
              if (!highlightEle) {
                return;
              }
              var _a = calculateOffset(highlightEle, container),
                left = _a.left,
                top = _a.top;
              var jump = store.get('jumpToDestination');
              if (jump) {
                jump({
                  pageIndex: pageIndex,
                  bottomOffset:
                    (container.getBoundingClientRect().height - top) /
                    renderStatus.scale,
                  leftOffset: left / renderStatus.scale,
                  scaleTo: renderStatus.scale,
                });
                if (currentMatchRef.current) {
                  currentMatchRef.current.classList.remove(
                    'rpv-search__highlight--current'
                  );
                }
                currentMatchRef.current = highlightEle;
                highlightEle.classList.add('rpv-search__highlight--current');
              }
            },
            [highlightAreas, matchPosition]
          );
          React__namespace.useEffect(function () {
            store.subscribe('keyword', handleKeywordChanged);
            store.subscribe('matchPosition', handleMatchPositionChanged);
            store.subscribe('renderStatus', handleRenderStatusChanged);
            return function () {
              store.unsubscribe('keyword', handleKeywordChanged);
              store.unsubscribe('matchPosition', handleMatchPositionChanged);
              store.unsubscribe('renderStatus', handleRenderStatusChanged);
            };
          }, []);
          return React__namespace.createElement(
            'div',
            {
              className: 'rpv-search__highlights',
              'data-testid': 'search__highlights-'.concat(pageIndex),
              ref: containerRef,
            },
            renderHighlightElements({
              getCssProperties: getCssProperties,
              highlightAreas: highlightAreas,
            })
          );
        };
        var escapeRegExp = function (input) {
          return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        };
        var normalizeFlagKeyword = function (flagKeyword) {
          var source = flagKeyword.wholeWords
            ? ' '.concat(flagKeyword.keyword, ' ')
            : flagKeyword.keyword;
          var flags = flagKeyword.matchCase ? 'g' : 'gi';
          return {
            keyword: flagKeyword.keyword,
            regExp: new RegExp(escapeRegExp(source), flags),
            wholeWords: flagKeyword.wholeWords || false,
          };
        };
        var normalizeSingleKeyword = function (keyword, matchCase, wholeWords) {
          if (keyword instanceof RegExp) {
            return {
              keyword: keyword.source,
              regExp: keyword,
              wholeWords: wholeWords || false,
            };
          }
          if (typeof keyword === 'string') {
            return keyword === ''
              ? EMPTY_KEYWORD_REGEXP
              : normalizeFlagKeyword({
                  keyword: keyword,
                  matchCase: matchCase || false,
                  wholeWords: wholeWords || false,
                });
          }
          if (typeof matchCase !== 'undefined') {
            keyword.matchCase = matchCase;
          }
          if (typeof wholeWords !== 'undefined') {
            keyword.wholeWords = wholeWords;
          }
          return normalizeFlagKeyword(keyword);
        };
        var useDocument = function (store) {
          var currentDocRef = React__namespace.useRef(store.get('doc'));
          var handleDocumentChanged = function (doc) {
            currentDocRef.current = doc;
          };
          React__namespace.useEffect(function () {
            store.subscribe('doc', handleDocumentChanged);
            return function () {
              store.unsubscribe('doc', handleDocumentChanged);
            };
          }, []);
          return currentDocRef;
        };
        var useSearch = function (store) {
          var initialKeyword = store.get('initialKeyword');
          var normalizedKeywordFlags = React__namespace.useMemo(function () {
            if (initialKeyword && initialKeyword.length === 1) {
              var normalizedKeyword = normalizeSingleKeyword(initialKeyword[0]);
              return {
                matchCase: normalizedKeyword.regExp.flags.indexOf('i') === -1,
                wholeWords: normalizedKeyword.wholeWords,
              };
            } else {
              return {
                matchCase: false,
                wholeWords: false,
              };
            }
          }, []);
          var currentDocRef = useDocument(store);
          var _a = React__namespace.useState(initialKeyword),
            keywords = _a[0],
            setKeywords = _a[1];
          var _b = React__namespace.useState([]),
            found = _b[0],
            setFound = _b[1];
          var _c = React__namespace.useState(0),
            currentMatch = _c[0],
            setCurrentMatch = _c[1];
          var _d = React__namespace.useState(normalizedKeywordFlags.matchCase),
            matchCase = _d[0],
            setMatchCase = _d[1];
          var textContents = React__namespace.useRef([]);
          var _e = React__namespace.useState(normalizedKeywordFlags.wholeWords),
            wholeWords = _e[0],
            setWholeWords = _e[1];
          var defaultTargetPageFilter = function () {
            return true;
          };
          var targetPageFilter = React__namespace.useCallback(
            function () {
              return store.get('targetPageFilter') || defaultTargetPageFilter;
            },
            [store.get('targetPageFilter')]
          );
          var changeMatchCase = function (isChecked) {
            setMatchCase(isChecked);
            if (keywords.length > 0) {
              searchFor(keywords, isChecked, wholeWords);
            }
          };
          var changeWholeWords = function (isChecked) {
            setWholeWords(isChecked);
            if (keywords.length > 0) {
              searchFor(keywords, matchCase, isChecked);
            }
          };
          var jumpToMatch = function (index) {
            var numMatches = found.length;
            if (keywords.length === 0 || numMatches === 0) {
              return null;
            }
            var normalizedIndex =
              index === numMatches + 1
                ? 1
                : Math.max(1, Math.min(numMatches, index));
            setCurrentMatch(normalizedIndex);
            return jumpToGivenMatch(found[normalizedIndex - 1]);
          };
          var jumpToPreviousMatch = function () {
            return jumpToMatch(currentMatch - 1);
          };
          var jumpToNextMatch = function () {
            return jumpToMatch(currentMatch + 1);
          };
          var clearKeyword = function () {
            store.update('keyword', [EMPTY_KEYWORD_REGEXP]);
            setKeyword('');
            setCurrentMatch(0);
            setFound([]);
            setMatchCase(false);
            setWholeWords(false);
          };
          var search = function () {
            return searchFor(keywords, matchCase, wholeWords);
          };
          var setKeyword = function (keyword) {
            return setKeywords(keyword === '' ? [] : [keyword]);
          };
          var setTargetPages = function (targetPageFilter) {
            store.update('targetPageFilter', targetPageFilter);
          };
          var getTextContents = function () {
            var currentDoc = currentDocRef.current;
            if (!currentDoc) {
              return Promise.resolve([]);
            }
            var promises = Array(currentDoc.numPages)
              .fill(0)
              .map(function (_, pageIndex) {
                return core
                  .getPage(currentDoc, pageIndex)
                  .then(function (page) {
                    return page.getTextContent();
                  })
                  .then(function (content) {
                    var pageContent = content.items
                      .map(function (item) {
                        return item.str || '';
                      })
                      .join('');
                    return Promise.resolve({
                      pageContent: pageContent,
                      pageIndex: pageIndex,
                    });
                  });
              });
            return Promise.all(promises).then(function (data) {
              data.sort(function (a, b) {
                return a.pageIndex - b.pageIndex;
              });
              return Promise.resolve(
                data.map(function (item) {
                  return item.pageContent;
                })
              );
            });
          };
          var jumpToGivenMatch = function (match) {
            var jumpToPage = store.get('jumpToPage');
            if (jumpToPage) {
              jumpToPage(match.pageIndex);
            }
            store.update('matchPosition', {
              matchIndex: match.matchIndex,
              pageIndex: match.pageIndex,
            });
            return match;
          };
          var getKeywordSource = function (keyword) {
            if (keyword instanceof RegExp) {
              return keyword.source;
            }
            if (typeof keyword === 'string') {
              return keyword;
            }
            return keyword.keyword;
          };
          var searchFor = function (
            keywordParam,
            matchCaseParam,
            wholeWordsParam
          ) {
            var currentDoc = currentDocRef.current;
            if (!currentDoc) {
              return Promise.resolve([]);
            }
            var numPages = currentDoc.numPages;
            var keywords = keywordParam.map(function (k) {
              return normalizeSingleKeyword(k, matchCaseParam, wholeWordsParam);
            });
            store.update('keyword', keywords);
            setCurrentMatch(0);
            setFound([]);
            return new Promise(function (resolve, _) {
              var getTextPromise =
                textContents.current.length === 0
                  ? getTextContents().then(function (response) {
                      textContents.current = response;
                      return Promise.resolve(response);
                    })
                  : Promise.resolve(textContents.current);
              getTextPromise.then(function (response) {
                var arr = [];
                response.forEach(function (pageText, pageIndex) {
                  if (
                    targetPageFilter()({
                      pageIndex: pageIndex,
                      numPages: numPages,
                    })
                  ) {
                    keywords.forEach(function (keyword) {
                      var matchIndex = 0;
                      var matches;
                      while (
                        (matches = keyword.regExp.exec(pageText)) !== null
                      ) {
                        arr.push({
                          keyword: keyword.regExp,
                          matchIndex: matchIndex,
                          pageIndex: pageIndex,
                          pageText: pageText,
                          startIndex: matches.index,
                          endIndex: keyword.regExp.lastIndex,
                        });
                        matchIndex++;
                      }
                    });
                  }
                });
                setFound(arr);
                if (arr.length > 0) {
                  setCurrentMatch(1);
                  jumpToGivenMatch(arr[0]);
                }
                resolve(arr);
              });
            });
          };
          React__namespace.useEffect(
            function () {
              textContents.current = [];
            },
            [currentDocRef.current]
          );
          return {
            clearKeyword: clearKeyword,
            changeMatchCase: changeMatchCase,
            changeWholeWords: changeWholeWords,
            currentMatch: currentMatch,
            jumpToMatch: jumpToMatch,
            jumpToNextMatch: jumpToNextMatch,
            jumpToPreviousMatch: jumpToPreviousMatch,
            keywords: keywords,
            matchCase: matchCase,
            numberOfMatches: found.length,
            wholeWords: wholeWords,
            search: search,
            searchFor: searchFor,
            setKeywords: setKeywords,
            keyword: keywords.length === 0 ? '' : getKeywordSource(keywords[0]),
            setKeyword: setKeyword,
            setTargetPages: setTargetPages,
          };
        };
        var Search = function (_a) {
          var children = _a.children,
            store = _a.store;
          var result = useSearch(store);
          var _b = React__namespace.useState(false),
            isDocumentLoaded = _b[0],
            setDocumentLoaded = _b[1];
          var handleDocumentChanged = function (_) {
            return setDocumentLoaded(true);
          };
          React__namespace.useEffect(function () {
            store.subscribe('doc', handleDocumentChanged);
            return function () {
              store.unsubscribe('doc', handleDocumentChanged);
            };
          }, []);
          return children(
            __assign(__assign({}, result), {
              isDocumentLoaded: isDocumentLoaded,
            })
          );
        };
        var ShortcutHandler = function (_a) {
          var containerRef = _a.containerRef,
            store = _a.store;
          var isMouseInsideRef = React__namespace.useRef(false);
          var handleMouseEnter = function () {
            isMouseInsideRef.current = true;
          };
          var handleMouseLeave = function () {
            isMouseInsideRef.current = false;
          };
          var handleKeydown = function (e) {
            var containerEle = containerRef.current;
            if (!containerEle) {
              return;
            }
            if (e.shiftKey || e.altKey || e.key !== 'f') {
              return;
            }
            var isCommandPressed = core.isMac()
              ? e.metaKey && !e.ctrlKey
              : e.ctrlKey;
            if (!isCommandPressed) {
              return;
            }
            if (
              isMouseInsideRef.current ||
              (document.activeElement &&
                containerEle.contains(document.activeElement))
            ) {
              e.preventDefault();
              store.update('areShortcutsPressed', true);
            }
          };
          React__namespace.useEffect(
            function () {
              var containerEle = containerRef.current;
              if (!containerEle) {
                return;
              }
              document.addEventListener('keydown', handleKeydown);
              containerEle.addEventListener('mouseenter', handleMouseEnter);
              containerEle.addEventListener('mouseleave', handleMouseLeave);
              return function () {
                document.removeEventListener('keydown', handleKeydown);
                containerEle.removeEventListener(
                  'mouseenter',
                  handleMouseEnter
                );
                containerEle.removeEventListener(
                  'mouseleave',
                  handleMouseLeave
                );
              };
            },
            [containerRef.current]
          );
          return React__namespace.createElement(
            React__namespace.Fragment,
            null
          );
        };
        var PORTAL_OFFSET$1 = {
          left: 0,
          top: 8,
        };
        var SearchPopover = function (_a) {
          var store = _a.store,
            onToggle = _a.onToggle;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var direction = React__namespace.useContext(
            core.ThemeContext
          ).direction;
          var _b = React__namespace.useState(false),
            isQuerying = _b[0],
            setIsQuerying = _b[1];
          var _c = React__namespace.useState(false),
            searchDone = _c[0],
            setSearchDone = _c[1];
          var isRtl = direction === core.TextDirection.RightToLeft;
          var _d = useSearch(store),
            clearKeyword = _d.clearKeyword,
            changeMatchCase = _d.changeMatchCase,
            changeWholeWords = _d.changeWholeWords,
            currentMatch = _d.currentMatch,
            jumpToNextMatch = _d.jumpToNextMatch,
            jumpToPreviousMatch = _d.jumpToPreviousMatch,
            keyword = _d.keyword,
            matchCase = _d.matchCase,
            numberOfMatches = _d.numberOfMatches,
            wholeWords = _d.wholeWords,
            search = _d.search,
            setKeyword = _d.setKeyword;
          var performSearch = function (cb) {
            setIsQuerying(true);
            search().then(function (_) {
              setIsQuerying(false);
              setSearchDone(true);
              cb && cb();
            });
          };
          var onKeydownSearch = function (e) {
            if (e.key === 'Enter' && keyword) {
              searchDone ? jumpToNextMatch() : performSearch();
            }
          };
          var onChangeMatchCase = function (e) {
            setSearchDone(false);
            changeMatchCase(e.target.checked);
          };
          var onChangeWholeWords = function (e) {
            setSearchDone(false);
            changeWholeWords(e.target.checked);
          };
          var onClose = function () {
            onToggle();
            clearKeyword();
          };
          var onChangeKeyword = function (value) {
            setSearchDone(false);
            setKeyword(value);
          };
          React__namespace.useEffect(function () {
            var initialKeyword = store.get('initialKeyword');
            if (initialKeyword && initialKeyword.length === 1 && keyword) {
              performSearch(function () {
                store.update('initialKeyword', []);
              });
            }
          }, []);
          var searchLabel =
            l10n && l10n.search ? l10n.search.enterToSearch : 'Enter to search';
          var previousMatchLabel =
            l10n && l10n.search ? l10n.search.previousMatch : 'Previous match';
          var nextMatchLabel =
            l10n && l10n.search ? l10n.search.nextMatch : 'Next match';
          var closeButtonLabel =
            l10n && l10n.search ? l10n.search.close : 'Close';
          return React__namespace.createElement(
            'div',
            {
              className: 'rpv-search__popover',
            },
            React__namespace.createElement(
              'div',
              {
                className: 'rpv-search__popover-input-counter',
              },
              React__namespace.createElement(core.TextBox, {
                ariaLabel: searchLabel,
                autoFocus: true,
                placeholder: searchLabel,
                type: 'text',
                value: keyword,
                onChange: onChangeKeyword,
                onKeyDown: onKeydownSearch,
              }),
              React__namespace.createElement(
                'div',
                {
                  className: core.classNames({
                    'rpv-search__popover-counter': true,
                    'rpv-search__popover-counter--ltr': !isRtl,
                    'rpv-search__popover-counter--rtl': isRtl,
                  }),
                },
                isQuerying &&
                  React__namespace.createElement(core.Spinner, {
                    testId: 'search__popover-searching',
                    size: '1rem',
                  }),
                !isQuerying &&
                  React__namespace.createElement(
                    'span',
                    {
                      'data-testid': 'search__popover-num-matches',
                    },
                    currentMatch,
                    '/',
                    numberOfMatches
                  )
              )
            ),
            React__namespace.createElement(
              'label',
              {
                className: 'rpv-search__popover-label',
              },
              React__namespace.createElement('input', {
                className: 'rpv-search__popover-label-checkbox',
                'data-testid': 'search__popover-match-case',
                checked: matchCase,
                type: 'checkbox',
                onChange: onChangeMatchCase,
              }),
              ' ',
              l10n && l10n.search ? l10n.search.matchCase : 'Match case'
            ),
            React__namespace.createElement(
              'label',
              {
                className: 'rpv-search__popover-label',
              },
              React__namespace.createElement('input', {
                className: 'rpv-search__popover-label-checkbox',
                checked: wholeWords,
                'data-testid': 'search__popover-whole-words',
                type: 'checkbox',
                onChange: onChangeWholeWords,
              }),
              ' ',
              l10n && l10n.search ? l10n.search.wholeWords : 'Whole words'
            ),
            React__namespace.createElement(
              'div',
              {
                className: 'rpv-search__popover-footer',
              },
              React__namespace.createElement(
                'div',
                {
                  className: 'rpv-search__popover-footer-item',
                },
                React__namespace.createElement(core.Tooltip, {
                  ariaControlsSuffix: 'search-previous-match',
                  position: isRtl
                    ? core.Position.BottomRight
                    : core.Position.BottomCenter,
                  target: React__namespace.createElement(
                    core.MinimalButton,
                    {
                      ariaLabel: previousMatchLabel,
                      isDisabled: currentMatch <= 1,
                      onClick: jumpToPreviousMatch,
                    },
                    React__namespace.createElement(PreviousIcon, null)
                  ),
                  content: function () {
                    return previousMatchLabel;
                  },
                  offset: PORTAL_OFFSET$1,
                })
              ),
              React__namespace.createElement(
                'div',
                {
                  className: 'rpv-search__popover-footer-item',
                },
                React__namespace.createElement(core.Tooltip, {
                  ariaControlsSuffix: 'search-next-match',
                  position: core.Position.BottomCenter,
                  target: React__namespace.createElement(
                    core.MinimalButton,
                    {
                      ariaLabel: nextMatchLabel,
                      isDisabled: currentMatch > numberOfMatches - 1,
                      onClick: jumpToNextMatch,
                    },
                    React__namespace.createElement(NextIcon, null)
                  ),
                  content: function () {
                    return nextMatchLabel;
                  },
                  offset: PORTAL_OFFSET$1,
                })
              ),
              React__namespace.createElement(
                'div',
                {
                  className: core.classNames({
                    'rpv-search__popover-footer-button': true,
                    'rpv-search__popover-footer-button--ltr': !isRtl,
                    'rpv-search__popover-footer-button--rtl': isRtl,
                  }),
                },
                React__namespace.createElement(
                  core.Button,
                  {
                    onClick: onClose,
                  },
                  closeButtonLabel
                )
              )
            )
          );
        };
        var ShowSearchPopoverDecorator = function (_a) {
          var children = _a.children,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label = l10n && l10n.search ? l10n.search.search : 'Search';
          var icon = React__namespace.createElement(SearchIcon, null);
          return children({
            icon: icon,
            label: label,
            onClick: onClick,
          });
        };
        var TOOLTIP_OFFSET = {
          left: 0,
          top: 8,
        };
        var ShowSearchPopoverButton = function (_a) {
          var enableShortcuts = _a.enableShortcuts,
            store = _a.store,
            onClick = _a.onClick;
          var ariaKeyShortcuts = enableShortcuts
            ? core.isMac()
              ? 'Meta+F'
              : 'Ctrl+F'
            : '';
          var handleShortcutsPressed = function (areShortcutsPressed) {
            if (areShortcutsPressed) {
              onClick();
            }
          };
          React__namespace.useEffect(function () {
            store.subscribe('areShortcutsPressed', handleShortcutsPressed);
            return function () {
              store.unsubscribe('areShortcutsPressed', handleShortcutsPressed);
            };
          }, []);
          return React__namespace.createElement(
            ShowSearchPopoverDecorator,
            {
              onClick: onClick,
            },
            function (p) {
              return React__namespace.createElement(core.Tooltip, {
                ariaControlsSuffix: 'search-popover',
                position: core.Position.BottomCenter,
                target: React__namespace.createElement(
                  core.MinimalButton,
                  {
                    ariaKeyShortcuts: ariaKeyShortcuts,
                    ariaLabel: p.label,
                    testId: 'search__popover-button',
                    onClick: onClick,
                  },
                  p.icon
                ),
                content: function () {
                  return p.label;
                },
                offset: TOOLTIP_OFFSET,
              });
            }
          );
        };
        var PORTAL_OFFSET = {
          left: 0,
          top: 8,
        };
        var ShowSearchPopover = function (_a) {
          var children = _a.children,
            enableShortcuts = _a.enableShortcuts,
            store = _a.store;
          var direction = React__namespace.useContext(
            core.ThemeContext
          ).direction;
          var portalPosition =
            direction === core.TextDirection.RightToLeft
              ? core.Position.BottomRight
              : core.Position.BottomLeft;
          var defaultChildren = function (props) {
            return React__namespace.createElement(
              ShowSearchPopoverButton,
              __assign(
                {
                  enableShortcuts: enableShortcuts,
                  store: store,
                },
                props
              )
            );
          };
          var render = children || defaultChildren;
          return React__namespace.createElement(core.Popover, {
            ariaControlsSuffix: 'search',
            lockScroll: false,
            position: portalPosition,
            target: function (toggle) {
              return render({
                onClick: toggle,
              });
            },
            content: function (toggle) {
              return React__namespace.createElement(SearchPopover, {
                store: store,
                onToggle: toggle,
              });
            },
            offset: PORTAL_OFFSET,
            closeOnClickOutside: false,
            closeOnEscape: true,
          });
        };
        var normalizeKeywords = function (keyword) {
          return Array.isArray(keyword)
            ? keyword.map(function (k) {
                return normalizeSingleKeyword(k);
              })
            : [normalizeSingleKeyword(keyword)];
        };
        var searchPlugin = function (props) {
          var searchPluginProps = React__namespace.useMemo(function () {
            return Object.assign(
              {},
              {
                enableShortcuts: true,
                onHighlightKeyword: function () {},
              },
              props
            );
          }, []);
          var store = React__namespace.useMemo(function () {
            return core.createStore({
              initialKeyword:
                props && props.keyword
                  ? Array.isArray(props.keyword)
                    ? props.keyword
                    : [props.keyword]
                  : [],
              keyword:
                props && props.keyword
                  ? normalizeKeywords(props.keyword)
                  : [EMPTY_KEYWORD_REGEXP],
              matchPosition: {
                matchIndex: -1,
                pageIndex: -1,
              },
              renderStatus: new Map(),
            });
          }, []);
          var _a = useSearch(store),
            clearKeyword = _a.clearKeyword,
            jumpToMatch = _a.jumpToMatch,
            jumpToNextMatch = _a.jumpToNextMatch,
            jumpToPreviousMatch = _a.jumpToPreviousMatch,
            searchFor = _a.searchFor,
            setKeywords = _a.setKeywords,
            setTargetPages = _a.setTargetPages;
          var SearchDecorator = function (props) {
            return React__namespace.createElement(
              Search,
              __assign({}, props, {
                store: store,
              })
            );
          };
          var ShowSearchPopoverDecorator = function (props) {
            return React__namespace.createElement(
              ShowSearchPopover,
              __assign(
                {
                  enableShortcuts: searchPluginProps.enableShortcuts,
                },
                props,
                {
                  store: store,
                }
              )
            );
          };
          var ShowSearchPopoverButtonDecorator = function () {
            return React__namespace.createElement(
              ShowSearchPopoverDecorator,
              null,
              function (props) {
                return React__namespace.createElement(
                  ShowSearchPopoverButton,
                  __assign(
                    {
                      enableShortcuts: searchPluginProps.enableShortcuts,
                      store: store,
                    },
                    props
                  )
                );
              }
            );
          };
          var renderViewer = function (renderViewerProps) {
            var currentSlot = renderViewerProps.slot;
            if (currentSlot.subSlot) {
              currentSlot.subSlot.children = React__namespace.createElement(
                React__namespace.Fragment,
                null,
                searchPluginProps.enableShortcuts &&
                  React__namespace.createElement(ShortcutHandler, {
                    containerRef: renderViewerProps.containerRef,
                    store: store,
                  }),
                currentSlot.subSlot.children
              );
            }
            return currentSlot;
          };
          var renderPageLayer = function (renderProps) {
            return React__namespace.createElement(Highlights, {
              key: renderProps.pageIndex,
              numPages: renderProps.doc.numPages,
              pageIndex: renderProps.pageIndex,
              renderHighlights:
                props === null || props === void 0
                  ? void 0
                  : props.renderHighlights,
              store: store,
              onHighlightKeyword: searchPluginProps.onHighlightKeyword,
            });
          };
          return {
            install: function (pluginFunctions) {
              var initialKeyword =
                props && props.keyword
                  ? Array.isArray(props.keyword)
                    ? props.keyword
                    : [props.keyword]
                  : [];
              var keyword =
                props && props.keyword
                  ? normalizeKeywords(props.keyword)
                  : [EMPTY_KEYWORD_REGEXP];
              store.update('initialKeyword', initialKeyword);
              store.update(
                'jumpToDestination',
                pluginFunctions.jumpToDestination
              );
              store.update('jumpToPage', pluginFunctions.jumpToPage);
              store.update('keyword', keyword);
            },
            renderPageLayer: renderPageLayer,
            renderViewer: renderViewer,
            uninstall: function (props) {
              var renderStatus = store.get('renderStatus');
              if (renderStatus) {
                renderStatus.clear();
              }
            },
            onDocumentLoad: function (props) {
              store.update('doc', props.doc);
            },
            onTextLayerRender: function (props) {
              var renderStatus = store.get('renderStatus');
              if (renderStatus) {
                renderStatus = renderStatus.set(props.pageIndex, props);
                store.update('renderStatus', renderStatus);
              }
            },
            Search: SearchDecorator,
            ShowSearchPopover: ShowSearchPopoverDecorator,
            ShowSearchPopoverButton: ShowSearchPopoverButtonDecorator,
            clearHighlights: function () {
              clearKeyword();
            },
            highlight: function (keyword) {
              var keywords = Array.isArray(keyword) ? keyword : [keyword];
              setKeywords(keywords);
              return searchFor(keywords);
            },
            jumpToMatch: jumpToMatch,
            jumpToNextMatch: jumpToNextMatch,
            jumpToPreviousMatch: jumpToPreviousMatch,
            setTargetPages: setTargetPages,
          };
        };
        exports.NextIcon = NextIcon;
        exports.PreviousIcon = PreviousIcon;
        exports.SearchIcon = SearchIcon;
        exports.searchPlugin = searchPlugin;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/search/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/search/lib/cjs/search.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
  '[project]/node_modules/@react-pdf-viewer/theme/lib/cjs/theme.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/theme/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        var DarkIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M19.5,15.106l2.4-2.4a1,1,0,0,0,0-1.414l-2.4-2.4V5.5a1,1,0,0,0-1-1H15.106l-2.4-2.4a1,1,0,0,0-1.414,0l-2.4,2.4H5.5a1,1,0,0,0-1,1V8.894l-2.4,2.4a1,1,0,0,0,0,1.414l2.4,2.4V18.5a1,1,0,0,0,1,1H8.894l2.4,2.4a1,1,0,0,0,1.414,0l2.4-2.4H18.5a1,1,0,0,0,1-1Z',
            }),
            React__namespace.createElement('path', {
              d: 'M10,6.349a6,6,0,0,1,0,11.3,6,6,0,1,0,0-11.3Z',
            })
          );
        };
        var LightIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M19.491,15.106l2.4-2.4a1,1,0,0,0,0-1.414l-2.4-2.4V5.5a1,1,0,0,0-1-1H15.1L12.7,2.1a1,1,0,0,0-1.414,0l-2.4,2.4H5.491a1,1,0,0,0-1,1V8.894l-2.4,2.4a1,1,0,0,0,0,1.414l2.4,2.4V18.5a1,1,0,0,0,1,1H8.885l2.4,2.4a1,1,0,0,0,1.414,0l2.4-2.4h3.394a1,1,0,0,0,1-1Z',
            }),
            React__namespace.createElement('path', {
              d: 'M11.491,6c4,0,6,2.686,6,6s-2,6-6,6Z',
            })
          );
        };
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign =
          function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var TOOLTIP_OFFSET = {
          left: 0,
          top: 8,
        };
        var SwitchThemeButton = function (_a) {
          var onClick = _a.onClick;
          var theme = React__namespace.useContext(core.ThemeContext);
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var isDarkTheme = theme.currentTheme === 'dark';
          var label =
            l10n && l10n.theme
              ? isDarkTheme
                ? l10n.theme.switchLightTheme
                : l10n.theme.switchDarkTheme
              : isDarkTheme
                ? 'Switch to the light theme'
                : 'Switch to the dark theme';
          return React__namespace.createElement(core.Tooltip, {
            ariaControlsSuffix: 'theme-switch',
            position: core.Position.BottomCenter,
            target: React__namespace.createElement(
              core.MinimalButton,
              {
                ariaLabel: label,
                testId: 'theme__switch-button',
                onClick: onClick,
              },
              isDarkTheme
                ? React__namespace.createElement(LightIcon, null)
                : React__namespace.createElement(DarkIcon, null)
            ),
            content: function () {
              return label;
            },
            offset: TOOLTIP_OFFSET,
          });
        };
        var SwitchTheme = function (_a) {
          var children = _a.children;
          var theme = React__namespace.useContext(core.ThemeContext);
          var defaultChildern = function (props) {
            return React__namespace.createElement(SwitchThemeButton, {
              onClick: props.onClick,
            });
          };
          var render = children || defaultChildern;
          return render({
            onClick: function () {
              return theme.setCurrentTheme(
                theme.currentTheme === 'dark' ? 'light' : 'dark'
              );
            },
          });
        };
        var SwitchThemeMenuItem = function (_a) {
          var onClick = _a.onClick;
          var theme = React__namespace.useContext(core.ThemeContext);
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var isDarkTheme = theme.currentTheme === 'dark';
          var label =
            l10n && l10n.theme
              ? isDarkTheme
                ? l10n.theme.switchLightTheme
                : l10n.theme.switchDarkTheme
              : isDarkTheme
                ? 'Switch to the light theme'
                : 'Switch to the dark theme';
          return React__namespace.createElement(
            core.MenuItem,
            {
              icon: isDarkTheme
                ? React__namespace.createElement(LightIcon, null)
                : React__namespace.createElement(DarkIcon, null),
              testId: 'theme__switch-menu',
              onClick: onClick,
            },
            label
          );
        };
        var themePlugin = function () {
          var SwitchThemeDecorator = function (props) {
            return React__namespace.createElement(
              SwitchTheme,
              __assign({}, props)
            );
          };
          var SwitchThemeButtonDecorator = function () {
            return React__namespace.createElement(
              SwitchThemeDecorator,
              null,
              function (props) {
                return React__namespace.createElement(
                  SwitchThemeButton,
                  __assign({}, props)
                );
              }
            );
          };
          var SwitchThemeMenuItemDecorator = function (props) {
            return React__namespace.createElement(
              SwitchThemeDecorator,
              null,
              function (p) {
                return React__namespace.createElement(SwitchThemeMenuItem, {
                  onClick: function () {
                    p.onClick();
                    props.onClick();
                  },
                });
              }
            );
          };
          return {
            SwitchTheme: SwitchThemeDecorator,
            SwitchThemeButton: SwitchThemeButtonDecorator,
            SwitchThemeMenuItem: SwitchThemeMenuItemDecorator,
          };
        };
        exports.DarkIcon = DarkIcon;
        exports.LightIcon = LightIcon;
        exports.themePlugin = themePlugin;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/theme/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/theme/lib/cjs/theme.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
  '[project]/node_modules/@react-pdf-viewer/zoom/lib/cjs/zoom.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/zoom/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        var ZoomInIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              ignoreDirection: true,
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M10.5,0.499c5.523,0,10,4.477,10,10s-4.477,10-10,10s-10-4.477-10-10S4.977,0.499,10.5,0.499z\n            M23.5,23.499\n            l-5.929-5.929\n            M5.5,10.499h10\n            M10.5,5.499v10',
            })
          );
        };
        var ZoomOutIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              ignoreDirection: true,
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M10.5,0.499c5.523,0,10,4.477,10,10s-4.477,10-10,10s-10-4.477-10-10S4.977,0.499,10.5,0.499z\n            M23.5,23.499\n            l-5.929-5.929\n            M5.5,10.499h10',
            })
          );
        };
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign =
          function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var useZoom = function (store) {
          var _a = React__namespace.useState(store.get('scale') || 0),
            scale = _a[0],
            setScale = _a[1];
          var handleScaleChanged = function (currentScale) {
            setScale(currentScale);
          };
          React__namespace.useEffect(function () {
            store.subscribe('scale', handleScaleChanged);
            return function () {
              store.unsubscribe('scale', handleScaleChanged);
            };
          }, []);
          return {
            scale: scale,
          };
        };
        var CurrentScale = function (_a) {
          var children = _a.children,
            store = _a.store;
          var scale = useZoom(store).scale;
          var defaultChildren = function (props) {
            return React__namespace.createElement(
              React__namespace.Fragment,
              null,
              ''.concat(Math.round(props.scale * 100), '%')
            );
          };
          var render = children || defaultChildren;
          return render({
            scale: scale,
          });
        };
        var WHEEL_EVENT_OPTIONS = {
          passive: false,
        };
        var svgElement = null;
        var createSvgElement = function () {
          return (
            svgElement ||
            (svgElement = document.createElementNS(
              'http://www.w3.org/2000/svg',
              'svg'
            ))
          );
        };
        var PinchZoom = function (_a) {
          var pagesContainerRef = _a.pagesContainerRef,
            store = _a.store;
          var zoomTo = core.useDebounceCallback(function (scale) {
            var zoom = store.get('zoom');
            if (zoom) {
              zoom(scale);
            }
          }, 40);
          var handleWheelEvent = function (e) {
            if (!e.ctrlKey) {
              return;
            }
            e.preventDefault();
            var target = e.target;
            var rect = target.getBoundingClientRect();
            var scaleDiff = 1 - e.deltaY / 100;
            var originX = e.clientX - rect.left;
            var originY = e.clientY - rect.top;
            var currentScale = store.get('scale');
            var matrix = createSvgElement()
              .createSVGMatrix()
              .translate(originX, originY)
              .scale(scaleDiff)
              .translate(-originX, -originY)
              .scale(currentScale);
            zoomTo(matrix.a);
          };
          core.useIsomorphicLayoutEffect(function () {
            var pagesContainer = pagesContainerRef.current;
            if (!pagesContainer) {
              return;
            }
            pagesContainer.addEventListener(
              'wheel',
              handleWheelEvent,
              WHEEL_EVENT_OPTIONS
            );
            return function () {
              pagesContainer.removeEventListener('wheel', handleWheelEvent);
            };
          }, []);
          return React__namespace.createElement(
            React__namespace.Fragment,
            null
          );
        };
        var LEVELS = [
          0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.3, 1.5, 1.7,
          1.9, 2.1, 2.4, 2.7, 3.0, 3.3, 3.7, 4.1, 4.6, 5.1, 5.7, 6.3, 7.0, 7.7,
          8.5, 9.4, 10,
        ];
        var increase = function (currentLevel) {
          var found = LEVELS.find(function (item) {
            return item > currentLevel;
          });
          return found || currentLevel;
        };
        var decrease = function (currentLevel) {
          var found = LEVELS.findIndex(function (item) {
            return item >= currentLevel;
          });
          return found === -1 || found === 0 ? currentLevel : LEVELS[found - 1];
        };
        var ShortcutHandler = function (_a) {
          var containerRef = _a.containerRef,
            store = _a.store;
          var keydownHandler = function (e) {
            if (e.shiftKey || e.altKey) {
              return;
            }
            var isCommandPressed = core.isMac() ? e.metaKey : e.ctrlKey;
            if (!isCommandPressed) {
              return;
            }
            var containerEle = containerRef.current;
            if (
              !containerEle ||
              !document.activeElement ||
              !containerEle.contains(document.activeElement)
            ) {
              return;
            }
            var zoom = store.get('zoom');
            if (!zoom) {
              return;
            }
            var scale = store.get('scale') || 1;
            var newScale = 1;
            switch (e.key) {
              case '-':
                newScale = decrease(scale);
                break;
              case '=':
                newScale = increase(scale);
                break;
              case '0':
                newScale = 1;
                break;
              default:
                newScale = scale;
                break;
            }
            if (newScale !== scale) {
              e.preventDefault();
              zoom(newScale);
            }
          };
          React__namespace.useEffect(
            function () {
              var containerEle = containerRef.current;
              if (!containerEle) {
                return;
              }
              document.addEventListener('keydown', keydownHandler);
              return function () {
                document.removeEventListener('keydown', keydownHandler);
              };
            },
            [containerRef.current]
          );
          return React__namespace.createElement(
            React__namespace.Fragment,
            null
          );
        };
        var DEFAULT_LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
        var PORTAL_OFFSET = {
          left: 0,
          top: 8,
        };
        var ZoomPopover = function (_a) {
          var _b = _a.levels,
            levels = _b === void 0 ? DEFAULT_LEVELS : _b,
            scale = _a.scale,
            onZoom = _a.onZoom;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var direction = React__namespace.useContext(
            core.ThemeContext
          ).direction;
          var isRtl = direction === core.TextDirection.RightToLeft;
          var getSpcialLevelLabel = function (level) {
            switch (level) {
              case core.SpecialZoomLevel.ActualSize:
                return l10n && l10n.zoom ? l10n.zoom.actualSize : 'Actual size';
              case core.SpecialZoomLevel.PageFit:
                return l10n && l10n.zoom ? l10n.zoom.pageFit : 'Page fit';
              case core.SpecialZoomLevel.PageWidth:
                return l10n && l10n.zoom ? l10n.zoom.pageWidth : 'Page width';
            }
          };
          var zoomDocumentLabel =
            l10n && l10n.zoom ? l10n.zoom.zoomDocument : 'Zoom document';
          var renderTarget = function (toggle) {
            var click = function () {
              toggle();
            };
            return React__namespace.createElement(
              core.MinimalButton,
              {
                ariaLabel: zoomDocumentLabel,
                testId: 'zoom__popover-target',
                onClick: click,
              },
              React__namespace.createElement(
                'span',
                {
                  className: 'rpv-zoom__popover-target',
                },
                React__namespace.createElement(
                  'span',
                  {
                    'data-testid': 'zoom__popover-target-scale',
                    className: core.classNames({
                      'rpv-zoom__popover-target-scale': true,
                      'rpv-zoom__popover-target-scale--ltr': !isRtl,
                      'rpv-zoom__popover-target-scale--rtl': isRtl,
                    }),
                  },
                  Math.round(scale * 100),
                  '%'
                ),
                React__namespace.createElement('span', {
                  className: 'rpv-zoom__popover-target-arrow',
                })
              )
            );
          };
          var renderContent = function (toggle) {
            return React__namespace.createElement(
              core.Menu,
              null,
              Object.keys(core.SpecialZoomLevel).map(function (k) {
                var level = k;
                var clickMenuItem = function () {
                  toggle();
                  onZoom(level);
                };
                return React__namespace.createElement(
                  core.MenuItem,
                  {
                    key: level,
                    onClick: clickMenuItem,
                  },
                  getSpcialLevelLabel(level)
                );
              }),
              React__namespace.createElement(core.MenuDivider, null),
              levels.map(function (level) {
                var clickMenuItem = function () {
                  toggle();
                  onZoom(level);
                };
                return React__namespace.createElement(
                  core.MenuItem,
                  {
                    key: level,
                    onClick: clickMenuItem,
                  },
                  ''.concat(Math.round(level * 100), '%')
                );
              })
            );
          };
          return React__namespace.createElement(core.Popover, {
            ariaControlsSuffix: 'zoom',
            ariaHasPopup: 'menu',
            position: core.Position.BottomCenter,
            target: renderTarget,
            content: renderContent,
            offset: PORTAL_OFFSET,
            closeOnClickOutside: true,
            closeOnEscape: true,
          });
        };
        var Zoom = function (_a) {
          var children = _a.children,
            levels = _a.levels,
            store = _a.store;
          var scale = useZoom(store).scale;
          var zoomTo = function (newLevel) {
            var zoom = store.get('zoom');
            if (zoom) {
              zoom(newLevel);
            }
          };
          var defaultChildren = function (props) {
            return React__namespace.createElement(ZoomPopover, {
              levels: levels,
              scale: props.scale,
              onZoom: props.onZoom,
            });
          };
          var render = children || defaultChildren;
          return render({
            scale: scale,
            onZoom: zoomTo,
          });
        };
        var TOOLTIP_OFFSET$1 = {
          left: 0,
          top: 8,
        };
        var ZoomInButton = function (_a) {
          var enableShortcuts = _a.enableShortcuts,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label = l10n && l10n.zoom ? l10n.zoom.zoomIn : 'Zoom in';
          var ariaKeyShortcuts = enableShortcuts
            ? core.isMac()
              ? 'Meta+='
              : 'Ctrl+='
            : '';
          return React__namespace.createElement(core.Tooltip, {
            ariaControlsSuffix: 'zoom-in',
            position: core.Position.BottomCenter,
            target: React__namespace.createElement(
              core.MinimalButton,
              {
                ariaKeyShortcuts: ariaKeyShortcuts,
                ariaLabel: label,
                testId: 'zoom__in-button',
                onClick: onClick,
              },
              React__namespace.createElement(ZoomInIcon, null)
            ),
            content: function () {
              return label;
            },
            offset: TOOLTIP_OFFSET$1,
          });
        };
        var ZoomIn = function (_a) {
          var children = _a.children,
            enableShortcuts = _a.enableShortcuts,
            store = _a.store;
          var scale = useZoom(store).scale;
          var zoomIn = function () {
            var zoom = store.get('zoom');
            if (zoom) {
              var newLevel = increase(scale);
              zoom(newLevel);
            }
          };
          var render = children || ZoomInButton;
          return render({
            enableShortcuts: enableShortcuts,
            onClick: zoomIn,
          });
        };
        var ZoomInMenuItem = function (_a) {
          var onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label = l10n && l10n.zoom ? l10n.zoom.zoomIn : 'Zoom in';
          return React__namespace.createElement(
            core.MenuItem,
            {
              icon: React__namespace.createElement(ZoomInIcon, null),
              testId: 'zoom__in-menu',
              onClick: onClick,
            },
            label
          );
        };
        var TOOLTIP_OFFSET = {
          left: 0,
          top: 8,
        };
        var ZoomOutButton = function (_a) {
          var enableShortcuts = _a.enableShortcuts,
            onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label = l10n && l10n.zoom ? l10n.zoom.zoomOut : 'Zoom out';
          var ariaKeyShortcuts = enableShortcuts
            ? core.isMac()
              ? 'Meta+-'
              : 'Ctrl+-'
            : '';
          return React__namespace.createElement(core.Tooltip, {
            ariaControlsSuffix: 'zoom-out',
            position: core.Position.BottomCenter,
            target: React__namespace.createElement(
              core.MinimalButton,
              {
                ariaKeyShortcuts: ariaKeyShortcuts,
                ariaLabel: label,
                testId: 'zoom__out-button',
                onClick: onClick,
              },
              React__namespace.createElement(ZoomOutIcon, null)
            ),
            content: function () {
              return label;
            },
            offset: TOOLTIP_OFFSET,
          });
        };
        var ZoomOut = function (_a) {
          var children = _a.children,
            enableShortcuts = _a.enableShortcuts,
            store = _a.store;
          var scale = useZoom(store).scale;
          var zoomIn = function () {
            var zoom = store.get('zoom');
            if (zoom) {
              var newLevel = decrease(scale);
              zoom(newLevel);
            }
          };
          var render = children || ZoomOutButton;
          return render({
            enableShortcuts: enableShortcuts,
            onClick: zoomIn,
          });
        };
        var ZoomOutMenuItem = function (_a) {
          var onClick = _a.onClick;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var label = l10n && l10n.zoom ? l10n.zoom.zoomOut : 'Zoom out';
          return React__namespace.createElement(
            core.MenuItem,
            {
              icon: React__namespace.createElement(ZoomOutIcon, null),
              testId: 'zoom__out-menu',
              onClick: onClick,
            },
            label
          );
        };
        var zoomPlugin = function (props) {
          var zoomPluginProps = React__namespace.useMemo(function () {
            return Object.assign(
              {},
              {
                enableShortcuts: true,
              },
              props
            );
          }, []);
          var store = React__namespace.useMemo(function () {
            return core.createStore({});
          }, []);
          var CurrentScaleDecorator = function (props) {
            return React__namespace.createElement(
              CurrentScale,
              __assign({}, props, {
                store: store,
              })
            );
          };
          var ZoomInDecorator = function (props) {
            return React__namespace.createElement(
              ZoomIn,
              __assign(
                {
                  enableShortcuts: zoomPluginProps.enableShortcuts,
                },
                props,
                {
                  store: store,
                }
              )
            );
          };
          var ZoomInButtonDecorator = function () {
            return React__namespace.createElement(
              ZoomInDecorator,
              null,
              function (props) {
                return React__namespace.createElement(
                  ZoomInButton,
                  __assign({}, props)
                );
              }
            );
          };
          var ZoomInMenuItemDecorator = function (props) {
            return React__namespace.createElement(
              ZoomInDecorator,
              null,
              function (p) {
                return React__namespace.createElement(ZoomInMenuItem, {
                  onClick: function () {
                    p.onClick();
                    props.onClick();
                  },
                });
              }
            );
          };
          var ZoomOutDecorator = function (props) {
            return React__namespace.createElement(
              ZoomOut,
              __assign(
                {
                  enableShortcuts: zoomPluginProps.enableShortcuts,
                },
                props,
                {
                  store: store,
                }
              )
            );
          };
          var ZoomOutButtonDecorator = function () {
            return React__namespace.createElement(
              ZoomOutDecorator,
              null,
              function (props) {
                return React__namespace.createElement(
                  ZoomOutButton,
                  __assign({}, props)
                );
              }
            );
          };
          var ZoomOutMenuItemDecorator = function (props) {
            return React__namespace.createElement(
              ZoomOutDecorator,
              null,
              function (p) {
                return React__namespace.createElement(ZoomOutMenuItem, {
                  onClick: function () {
                    p.onClick();
                    props.onClick();
                  },
                });
              }
            );
          };
          var ZoomDecorator = function (props) {
            return React__namespace.createElement(
              Zoom,
              __assign({}, props, {
                store: store,
              })
            );
          };
          var ZoomPopoverDecorator = function (zoomPopverProps) {
            return React__namespace.createElement(
              ZoomDecorator,
              null,
              function (props) {
                return React__namespace.createElement(
                  ZoomPopover,
                  __assign(
                    {
                      levels:
                        zoomPopverProps === null || zoomPopverProps === void 0
                          ? void 0
                          : zoomPopverProps.levels,
                    },
                    props
                  )
                );
              }
            );
          };
          var renderViewer = function (props) {
            var slot = props.slot;
            if (!zoomPluginProps.enableShortcuts) {
              return slot;
            }
            var updateSlot = {
              children: React__namespace.createElement(
                React__namespace.Fragment,
                null,
                React__namespace.createElement(ShortcutHandler, {
                  containerRef: props.containerRef,
                  store: store,
                }),
                React__namespace.createElement(PinchZoom, {
                  pagesContainerRef: props.pagesContainerRef,
                  store: store,
                }),
                slot.children
              ),
            };
            return __assign(__assign({}, slot), updateSlot);
          };
          return {
            renderViewer: renderViewer,
            install: function (pluginFunctions) {
              store.update('zoom', pluginFunctions.zoom);
            },
            onViewerStateChange: function (viewerState) {
              store.update('scale', viewerState.scale);
              return viewerState;
            },
            zoomTo: function (scale) {
              var zoom = store.get('zoom');
              if (zoom) {
                zoom(scale);
              }
            },
            CurrentScale: CurrentScaleDecorator,
            ZoomIn: ZoomInDecorator,
            ZoomInButton: ZoomInButtonDecorator,
            ZoomInMenuItem: ZoomInMenuItemDecorator,
            ZoomOut: ZoomOutDecorator,
            ZoomOutButton: ZoomOutButtonDecorator,
            ZoomOutMenuItem: ZoomOutMenuItemDecorator,
            Zoom: ZoomDecorator,
            ZoomPopover: ZoomPopoverDecorator,
          };
        };
        exports.ZoomInIcon = ZoomInIcon;
        exports.ZoomOutIcon = ZoomOutIcon;
        exports.zoomPlugin = zoomPlugin;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/zoom/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/zoom/lib/cjs/zoom.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
  '[project]/node_modules/@react-pdf-viewer/toolbar/lib/cjs/toolbar.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/toolbar/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var selectionMode = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/selection-mode/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        var fullScreen = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/full-screen/lib/index.js [app-ssr] (ecmascript)'
        );
        var getFile = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/get-file/lib/index.js [app-ssr] (ecmascript)'
        );
        var open = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/open/lib/index.js [app-ssr] (ecmascript)'
        );
        var pageNavigation = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/page-navigation/lib/index.js [app-ssr] (ecmascript)'
        );
        var print = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/print/lib/index.js [app-ssr] (ecmascript)'
        );
        var properties = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/properties/lib/index.js [app-ssr] (ecmascript)'
        );
        var rotate = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/rotate/lib/index.js [app-ssr] (ecmascript)'
        );
        var scrollMode = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/scroll-mode/lib/index.js [app-ssr] (ecmascript)'
        );
        var search = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/search/lib/index.js [app-ssr] (ecmascript)'
        );
        var theme = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/theme/lib/index.js [app-ssr] (ecmascript)'
        );
        var zoom = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/zoom/lib/index.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        var MoreIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M12,0.5c1.381,0,2.5,1.119,2.5,2.5S13.381,5.5,12,5.5S9.5,4.381,9.5,3S10.619,0.5,12,0.5z\n            M12,9.5\n            c1.381,0,2.5,1.119,2.5,2.5s-1.119,2.5-2.5,2.5S9.5,13.381,9.5,12S10.619,9.5,12,9.5z\n            M12,18.5c1.381,0,2.5,1.119,2.5,2.5\n            s-1.119,2.5-2.5,2.5S9.5,22.381,9.5,21S10.619,18.5,12,18.5z',
            })
          );
        };
        var PORTAL_OFFSET = {
          left: 0,
          top: 8,
        };
        var MoreActionsPopover = function (_a) {
          var toolbarSlot = _a.toolbarSlot;
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var direction = React__namespace.useContext(
            core.ThemeContext
          ).direction;
          var portalPosition =
            direction === core.TextDirection.RightToLeft
              ? core.Position.BottomLeft
              : core.Position.BottomRight;
          var DownloadMenuItem = toolbarSlot.DownloadMenuItem,
            EnterFullScreenMenuItem = toolbarSlot.EnterFullScreenMenuItem,
            GoToFirstPageMenuItem = toolbarSlot.GoToFirstPageMenuItem,
            GoToLastPageMenuItem = toolbarSlot.GoToLastPageMenuItem,
            GoToNextPageMenuItem = toolbarSlot.GoToNextPageMenuItem,
            GoToPreviousPageMenuItem = toolbarSlot.GoToPreviousPageMenuItem,
            OpenMenuItem = toolbarSlot.OpenMenuItem,
            PrintMenuItem = toolbarSlot.PrintMenuItem,
            RotateBackwardMenuItem = toolbarSlot.RotateBackwardMenuItem,
            RotateForwardMenuItem = toolbarSlot.RotateForwardMenuItem,
            ShowPropertiesMenuItem = toolbarSlot.ShowPropertiesMenuItem,
            SwitchScrollModeMenuItem = toolbarSlot.SwitchScrollModeMenuItem,
            SwitchSelectionModeMenuItem =
              toolbarSlot.SwitchSelectionModeMenuItem,
            SwitchViewModeMenuItem = toolbarSlot.SwitchViewModeMenuItem,
            SwitchThemeMenuItem = toolbarSlot.SwitchThemeMenuItem;
          var renderTarget = function (toggle, opened) {
            var label =
              l10n && l10n.toolbar ? l10n.toolbar.moreActions : 'More actions';
            return React__namespace.createElement(core.Tooltip, {
              ariaControlsSuffix: 'toolbar-more-actions',
              position: portalPosition,
              target: React__namespace.createElement(
                core.MinimalButton,
                {
                  ariaLabel: label,
                  isSelected: opened,
                  testId: 'toolbar__more-actions-popover-target',
                  onClick: toggle,
                },
                React__namespace.createElement(MoreIcon, null)
              ),
              content: function () {
                return label;
              },
              offset: PORTAL_OFFSET,
            });
          };
          var renderContent = function (toggle) {
            return React__namespace.createElement(
              core.Menu,
              null,
              React__namespace.createElement(
                'div',
                {
                  className:
                    'rpv-core__display--block rpv-core__display--hidden-medium',
                },
                React__namespace.createElement(SwitchThemeMenuItem, {
                  onClick: toggle,
                })
              ),
              React__namespace.createElement(
                'div',
                {
                  className:
                    'rpv-core__display--block rpv-core__display--hidden-medium',
                },
                React__namespace.createElement(EnterFullScreenMenuItem, {
                  onClick: toggle,
                })
              ),
              React__namespace.createElement(
                'div',
                {
                  className:
                    'rpv-core__display--block rpv-core__display--hidden-medium',
                },
                React__namespace.createElement(OpenMenuItem, null)
              ),
              React__namespace.createElement(
                'div',
                {
                  className:
                    'rpv-core__display--block rpv-core__display--hidden-medium',
                },
                React__namespace.createElement(PrintMenuItem, {
                  onClick: toggle,
                })
              ),
              React__namespace.createElement(
                'div',
                {
                  className:
                    'rpv-core__display--block rpv-core__display--hidden-medium',
                },
                React__namespace.createElement(DownloadMenuItem, {
                  onClick: toggle,
                })
              ),
              React__namespace.createElement(
                'div',
                {
                  className:
                    'rpv-core__display--block rpv-core__display--hidden-medium',
                },
                React__namespace.createElement(core.MenuDivider, null)
              ),
              React__namespace.createElement(GoToFirstPageMenuItem, {
                onClick: toggle,
              }),
              React__namespace.createElement(
                'div',
                {
                  className:
                    'rpv-core__display--block rpv-core__display--hidden-medium',
                },
                React__namespace.createElement(GoToPreviousPageMenuItem, {
                  onClick: toggle,
                })
              ),
              React__namespace.createElement(
                'div',
                {
                  className:
                    'rpv-core__display--block rpv-core__display--hidden-medium',
                },
                React__namespace.createElement(GoToNextPageMenuItem, {
                  onClick: toggle,
                })
              ),
              React__namespace.createElement(GoToLastPageMenuItem, {
                onClick: toggle,
              }),
              React__namespace.createElement(core.MenuDivider, null),
              React__namespace.createElement(RotateForwardMenuItem, {
                onClick: toggle,
              }),
              React__namespace.createElement(RotateBackwardMenuItem, {
                onClick: toggle,
              }),
              React__namespace.createElement(core.MenuDivider, null),
              React__namespace.createElement(SwitchSelectionModeMenuItem, {
                mode: selectionMode.SelectionMode.Text,
                onClick: toggle,
              }),
              React__namespace.createElement(SwitchSelectionModeMenuItem, {
                mode: selectionMode.SelectionMode.Hand,
                onClick: toggle,
              }),
              React__namespace.createElement(core.MenuDivider, null),
              React__namespace.createElement(SwitchScrollModeMenuItem, {
                mode: core.ScrollMode.Page,
                onClick: toggle,
              }),
              React__namespace.createElement(SwitchScrollModeMenuItem, {
                mode: core.ScrollMode.Vertical,
                onClick: toggle,
              }),
              React__namespace.createElement(SwitchScrollModeMenuItem, {
                mode: core.ScrollMode.Horizontal,
                onClick: toggle,
              }),
              React__namespace.createElement(SwitchScrollModeMenuItem, {
                mode: core.ScrollMode.Wrapped,
                onClick: toggle,
              }),
              React__namespace.createElement(core.MenuDivider, null),
              React__namespace.createElement(
                'div',
                {
                  className:
                    'rpv-core__display--hidden rpv-core__display--block-small',
                },
                React__namespace.createElement(SwitchViewModeMenuItem, {
                  mode: core.ViewMode.SinglePage,
                  onClick: toggle,
                })
              ),
              React__namespace.createElement(
                'div',
                {
                  className:
                    'rpv-core__display--hidden rpv-core__display--block-small',
                },
                React__namespace.createElement(SwitchViewModeMenuItem, {
                  mode: core.ViewMode.DualPage,
                  onClick: toggle,
                })
              ),
              React__namespace.createElement(
                'div',
                {
                  className:
                    'rpv-core__display--hidden rpv-core__display--block-small',
                },
                React__namespace.createElement(SwitchViewModeMenuItem, {
                  mode: core.ViewMode.DualPageWithCover,
                  onClick: toggle,
                })
              ),
              React__namespace.createElement(
                'div',
                {
                  className:
                    'rpv-core__display--hidden rpv-core__display--block-small',
                },
                React__namespace.createElement(core.MenuDivider, null)
              ),
              React__namespace.createElement(ShowPropertiesMenuItem, {
                onClick: toggle,
              })
            );
          };
          return React__namespace.createElement(core.Popover, {
            ariaControlsSuffix: 'toolbar-more-actions',
            ariaHasPopup: 'menu',
            position: portalPosition,
            target: renderTarget,
            content: renderContent,
            offset: PORTAL_OFFSET,
            closeOnClickOutside: true,
            closeOnEscape: true,
          });
        };
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign =
          function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var renderDefaultToolbar = function (transformToolbarSlot) {
          return function (defaultToolbarSlot) {
            var toolbarSlot = React__namespace.useMemo(function () {
              return transformToolbarSlot(defaultToolbarSlot);
            }, []);
            var direction = React__namespace.useContext(
              core.ThemeContext
            ).direction;
            var isRtl = direction === core.TextDirection.RightToLeft;
            var CurrentPageInput = toolbarSlot.CurrentPageInput,
              Download = toolbarSlot.Download,
              EnterFullScreen = toolbarSlot.EnterFullScreen,
              GoToNextPage = toolbarSlot.GoToNextPage,
              GoToPreviousPage = toolbarSlot.GoToPreviousPage,
              NumberOfPages = toolbarSlot.NumberOfPages,
              Open = toolbarSlot.Open,
              Print = toolbarSlot.Print,
              ShowSearchPopover = toolbarSlot.ShowSearchPopover,
              SwitchTheme = toolbarSlot.SwitchTheme,
              Zoom = toolbarSlot.Zoom,
              ZoomIn = toolbarSlot.ZoomIn,
              ZoomOut = toolbarSlot.ZoomOut;
            return React__namespace.createElement(
              'div',
              {
                'data-testid': 'toolbar',
                className: core.classNames({
                  'rpv-toolbar': true,
                  'rpv-toolbar--rtl': isRtl,
                }),
                role: 'toolbar',
                'aria-orientation': 'horizontal',
              },
              React__namespace.createElement(
                'div',
                {
                  className: 'rpv-toolbar__left',
                },
                React__namespace.createElement(
                  'div',
                  {
                    className: 'rpv-toolbar__item',
                  },
                  React__namespace.createElement(ShowSearchPopover, null)
                ),
                React__namespace.createElement(
                  'div',
                  {
                    className:
                      'rpv-core__display--hidden rpv-core__display--block-small',
                  },
                  React__namespace.createElement(
                    'div',
                    {
                      className: 'rpv-toolbar__item',
                    },
                    React__namespace.createElement(GoToPreviousPage, null)
                  )
                ),
                React__namespace.createElement(
                  'div',
                  {
                    className: 'rpv-toolbar__item',
                  },
                  React__namespace.createElement(CurrentPageInput, null),
                  React__namespace.createElement(
                    'span',
                    {
                      className: 'rpv-toolbar__label',
                    },
                    React__namespace.createElement(NumberOfPages, null)
                  )
                ),
                React__namespace.createElement(
                  'div',
                  {
                    className:
                      'rpv-core__display--hidden rpv-core__display--block-small',
                  },
                  React__namespace.createElement(
                    'div',
                    {
                      className: 'rpv-toolbar__item',
                    },
                    React__namespace.createElement(GoToNextPage, null)
                  )
                )
              ),
              React__namespace.createElement(
                'div',
                {
                  className: 'rpv-toolbar__center',
                },
                React__namespace.createElement(
                  'div',
                  {
                    className: 'rpv-toolbar__item',
                  },
                  React__namespace.createElement(ZoomOut, null)
                ),
                React__namespace.createElement(
                  'div',
                  {
                    className:
                      'rpv-core__display--hidden rpv-core__display--block-small',
                  },
                  React__namespace.createElement(
                    'div',
                    {
                      className: 'rpv-toolbar__item',
                    },
                    React__namespace.createElement(Zoom, null)
                  )
                ),
                React__namespace.createElement(
                  'div',
                  {
                    className: 'rpv-toolbar__item',
                  },
                  React__namespace.createElement(ZoomIn, null)
                )
              ),
              React__namespace.createElement(
                'div',
                {
                  className: 'rpv-toolbar__right',
                },
                React__namespace.createElement(
                  'div',
                  {
                    className:
                      'rpv-core__display--hidden rpv-core__display--block-medium',
                  },
                  React__namespace.createElement(
                    'div',
                    {
                      className: 'rpv-toolbar__item',
                    },
                    React__namespace.createElement(SwitchTheme, null)
                  )
                ),
                React__namespace.createElement(
                  'div',
                  {
                    className:
                      'rpv-core__display--hidden rpv-core__display--block-medium',
                  },
                  React__namespace.createElement(
                    'div',
                    {
                      className: 'rpv-toolbar__item',
                    },
                    React__namespace.createElement(EnterFullScreen, null)
                  )
                ),
                React__namespace.createElement(
                  'div',
                  {
                    className:
                      'rpv-core__display--hidden rpv-core__display--block-medium',
                  },
                  React__namespace.createElement(
                    'div',
                    {
                      className: 'rpv-toolbar__item',
                    },
                    React__namespace.createElement(Open, null)
                  )
                ),
                React__namespace.createElement(
                  'div',
                  {
                    className:
                      'rpv-core__display--hidden rpv-core__display--block-medium',
                  },
                  React__namespace.createElement(
                    'div',
                    {
                      className: 'rpv-toolbar__item',
                    },
                    React__namespace.createElement(Download, null)
                  )
                ),
                React__namespace.createElement(
                  'div',
                  {
                    className:
                      'rpv-core__display--hidden rpv-core__display--block-medium',
                  },
                  React__namespace.createElement(
                    'div',
                    {
                      className: 'rpv-toolbar__item',
                    },
                    React__namespace.createElement(Print, null)
                  )
                ),
                React__namespace.createElement(
                  'div',
                  {
                    className: 'rpv-toolbar__item',
                  },
                  React__namespace.createElement(MoreActionsPopover, {
                    toolbarSlot: toolbarSlot,
                  })
                )
              )
            );
          };
        };
        var defaultTransform = function (slot) {
          var NumberOfPages = slot.NumberOfPages;
          return Object.assign({}, slot, {
            NumberOfPages: function () {
              return React__namespace.createElement(
                React__namespace.Fragment,
                null,
                '/ ',
                React__namespace.createElement(NumberOfPages, null)
              );
            },
          });
        };
        var DefaultToobar = function (toolbarSlot) {
          return renderDefaultToolbar(defaultTransform)(toolbarSlot);
        };
        var Toolbar = function (_a) {
          var children = _a.children,
            slot = _a.slot;
          var render = children || DefaultToobar;
          return render(slot);
        };
        var toolbarPlugin = function (props) {
          var fullScreenPluginInstance = fullScreen.fullScreenPlugin(
            props ? props.fullScreenPlugin : {}
          );
          var getFilePluginInstance = getFile.getFilePlugin(
            props ? props.getFilePlugin : {}
          );
          var openPluginInstance = open.openPlugin(
            props ? props.openPlugin : {}
          );
          var pageNavigationPluginInstance =
            pageNavigation.pageNavigationPlugin(
              props ? props.pageNavigationPlugin : {}
            );
          var printPluginInstance = print.printPlugin(
            props ? props.printPlugin : {}
          );
          var propertiesPluginInstance = properties.propertiesPlugin();
          var rotatePluginInstance = rotate.rotatePlugin();
          var scrollModePluginInstance = scrollMode.scrollModePlugin();
          var searchPluginInstance = search.searchPlugin(
            props ? props.searchPlugin : {}
          );
          var selectionModePluginInstance = selectionMode.selectionModePlugin(
            props ? props.selectionModePlugin : {}
          );
          var themePluginInstance = theme.themePlugin();
          var zoomPluginInstance = zoom.zoomPlugin(
            props ? props.zoomPlugin : {}
          );
          var plugins = [
            fullScreenPluginInstance,
            getFilePluginInstance,
            openPluginInstance,
            pageNavigationPluginInstance,
            printPluginInstance,
            propertiesPluginInstance,
            rotatePluginInstance,
            scrollModePluginInstance,
            searchPluginInstance,
            selectionModePluginInstance,
            themePluginInstance,
            zoomPluginInstance,
          ];
          var ToolbarDecorator = React__namespace.useCallback(function (props) {
            var EnterFullScreen = fullScreenPluginInstance.EnterFullScreen,
              EnterFullScreenMenuItem =
                fullScreenPluginInstance.EnterFullScreenMenuItem;
            var Download = getFilePluginInstance.Download,
              DownloadMenuItem = getFilePluginInstance.DownloadMenuItem;
            var Open = openPluginInstance.Open,
              OpenMenuItem = openPluginInstance.OpenMenuItem;
            var CurrentPageInput =
                pageNavigationPluginInstance.CurrentPageInput,
              CurrentPageLabel = pageNavigationPluginInstance.CurrentPageLabel,
              GoToFirstPage = pageNavigationPluginInstance.GoToFirstPage,
              GoToFirstPageMenuItem =
                pageNavigationPluginInstance.GoToFirstPageMenuItem,
              GoToLastPage = pageNavigationPluginInstance.GoToLastPage,
              GoToLastPageMenuItem =
                pageNavigationPluginInstance.GoToLastPageMenuItem,
              GoToNextPage = pageNavigationPluginInstance.GoToNextPage,
              GoToNextPageMenuItem =
                pageNavigationPluginInstance.GoToNextPageMenuItem,
              GoToPreviousPage = pageNavigationPluginInstance.GoToPreviousPage,
              GoToPreviousPageMenuItem =
                pageNavigationPluginInstance.GoToPreviousPageMenuItem,
              NumberOfPages = pageNavigationPluginInstance.NumberOfPages;
            var Print = printPluginInstance.Print,
              PrintMenuItem = printPluginInstance.PrintMenuItem;
            var ShowProperties = propertiesPluginInstance.ShowProperties,
              ShowPropertiesMenuItem =
                propertiesPluginInstance.ShowPropertiesMenuItem;
            var Rotate = rotatePluginInstance.Rotate,
              RotateBackwardMenuItem =
                rotatePluginInstance.RotateBackwardMenuItem,
              RotateForwardMenuItem =
                rotatePluginInstance.RotateForwardMenuItem;
            var SwitchScrollMode = scrollModePluginInstance.SwitchScrollMode,
              SwitchScrollModeMenuItem =
                scrollModePluginInstance.SwitchScrollModeMenuItem,
              SwitchViewMode = scrollModePluginInstance.SwitchViewMode,
              SwitchViewModeMenuItem =
                scrollModePluginInstance.SwitchViewModeMenuItem;
            var Search = searchPluginInstance.Search,
              ShowSearchPopover = searchPluginInstance.ShowSearchPopover;
            var SwitchSelectionMode =
                selectionModePluginInstance.SwitchSelectionMode,
              SwitchSelectionModeMenuItem =
                selectionModePluginInstance.SwitchSelectionModeMenuItem;
            var SwitchTheme = themePluginInstance.SwitchTheme,
              SwitchThemeMenuItem = themePluginInstance.SwitchThemeMenuItem;
            var CurrentScale = zoomPluginInstance.CurrentScale,
              Zoom = zoomPluginInstance.Zoom,
              ZoomIn = zoomPluginInstance.ZoomIn,
              ZoomInMenuItem = zoomPluginInstance.ZoomInMenuItem,
              ZoomOut = zoomPluginInstance.ZoomOut,
              ZoomOutMenuItem = zoomPluginInstance.ZoomOutMenuItem;
            return React__namespace.createElement(
              Toolbar,
              __assign({}, props, {
                slot: {
                  CurrentPageInput: CurrentPageInput,
                  CurrentPageLabel: CurrentPageLabel,
                  CurrentScale: CurrentScale,
                  Download: Download,
                  DownloadMenuItem: DownloadMenuItem,
                  EnterFullScreen: EnterFullScreen,
                  EnterFullScreenMenuItem: EnterFullScreenMenuItem,
                  GoToFirstPage: GoToFirstPage,
                  GoToFirstPageMenuItem: GoToFirstPageMenuItem,
                  GoToLastPage: GoToLastPage,
                  GoToLastPageMenuItem: GoToLastPageMenuItem,
                  GoToNextPage: GoToNextPage,
                  GoToNextPageMenuItem: GoToNextPageMenuItem,
                  GoToPreviousPage: GoToPreviousPage,
                  GoToPreviousPageMenuItem: GoToPreviousPageMenuItem,
                  NumberOfPages: NumberOfPages,
                  Open: Open,
                  OpenMenuItem: OpenMenuItem,
                  Print: Print,
                  PrintMenuItem: PrintMenuItem,
                  Rotate: Rotate,
                  RotateBackwardMenuItem: RotateBackwardMenuItem,
                  RotateForwardMenuItem: RotateForwardMenuItem,
                  Search: Search,
                  ShowProperties: ShowProperties,
                  ShowPropertiesMenuItem: ShowPropertiesMenuItem,
                  ShowSearchPopover: ShowSearchPopover,
                  SwitchScrollMode: SwitchScrollMode,
                  SwitchScrollModeMenuItem: SwitchScrollModeMenuItem,
                  SwitchSelectionMode: SwitchSelectionMode,
                  SwitchSelectionModeMenuItem: SwitchSelectionModeMenuItem,
                  SwitchViewMode: SwitchViewMode,
                  SwitchViewModeMenuItem: SwitchViewModeMenuItem,
                  SwitchTheme: SwitchTheme,
                  SwitchThemeMenuItem: SwitchThemeMenuItem,
                  Zoom: Zoom,
                  ZoomIn: ZoomIn,
                  ZoomInMenuItem: ZoomInMenuItem,
                  ZoomOut: ZoomOut,
                  ZoomOutMenuItem: ZoomOutMenuItem,
                },
              })
            );
          }, []);
          return {
            fullScreenPluginInstance: fullScreenPluginInstance,
            getFilePluginInstance: getFilePluginInstance,
            openPluginInstance: openPluginInstance,
            pageNavigationPluginInstance: pageNavigationPluginInstance,
            printPluginInstance: printPluginInstance,
            propertiesPluginInstance: propertiesPluginInstance,
            rotatePluginInstance: rotatePluginInstance,
            scrollModePluginInstance: scrollModePluginInstance,
            searchPluginInstance: searchPluginInstance,
            selectionModePluginInstance: selectionModePluginInstance,
            themePluginInstance: themePluginInstance,
            zoomPluginInstance: zoomPluginInstance,
            install: function (pluginFunctions) {
              plugins.forEach(function (plugin) {
                if (plugin.install) {
                  plugin.install(pluginFunctions);
                }
              });
            },
            renderPageLayer: function (renderProps) {
              return React__namespace.createElement(
                React__namespace.Fragment,
                null,
                plugins.map(function (plugin, idx) {
                  return plugin.renderPageLayer
                    ? React__namespace.createElement(
                        React__namespace.Fragment,
                        {
                          key: idx,
                        },
                        plugin.renderPageLayer(renderProps)
                      )
                    : React__namespace.createElement(
                        React__namespace.Fragment,
                        {
                          key: idx,
                        }
                      );
                })
              );
            },
            renderViewer: function (props) {
              var slot = props.slot;
              plugins.forEach(function (plugin) {
                if (plugin.renderViewer) {
                  slot = plugin.renderViewer(
                    __assign(__assign({}, props), {
                      slot: slot,
                    })
                  );
                }
              });
              return slot;
            },
            uninstall: function (pluginFunctions) {
              plugins.forEach(function (plugin) {
                if (plugin.uninstall) {
                  plugin.uninstall(pluginFunctions);
                }
              });
            },
            onDocumentLoad: function (props) {
              plugins.forEach(function (plugin) {
                if (plugin.onDocumentLoad) {
                  plugin.onDocumentLoad(props);
                }
              });
            },
            onAnnotationLayerRender: function (props) {
              plugins.forEach(function (plugin) {
                if (plugin.onAnnotationLayerRender) {
                  plugin.onAnnotationLayerRender(props);
                }
              });
            },
            onTextLayerRender: function (props) {
              plugins.forEach(function (plugin) {
                if (plugin.onTextLayerRender) {
                  plugin.onTextLayerRender(props);
                }
              });
            },
            onViewerStateChange: function (viewerState) {
              var newState = viewerState;
              plugins.forEach(function (plugin) {
                if (plugin.onViewerStateChange) {
                  newState = plugin.onViewerStateChange(newState);
                }
              });
              return newState;
            },
            renderDefaultToolbar: renderDefaultToolbar,
            Toolbar: ToolbarDecorator,
          };
        };
        exports.MoreActionsPopover = MoreActionsPopover;
        exports.MoreIcon = MoreIcon;
        exports.toolbarPlugin = toolbarPlugin;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/toolbar/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/toolbar/lib/cjs/toolbar.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
  '[project]/node_modules/@react-pdf-viewer/default-layout/lib/cjs/default-layout.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        ('use strict');
        var core = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/default-layout/node_modules/@react-pdf-viewer/core/lib/index.js [app-ssr] (ecmascript)'
        );
        var React = __turbopack_require__(
          '[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)'
        );
        var attachment = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/attachment/lib/index.js [app-ssr] (ecmascript)'
        );
        var bookmark = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/bookmark/lib/index.js [app-ssr] (ecmascript)'
        );
        var thumbnail = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/thumbnail/lib/index.js [app-ssr] (ecmascript)'
        );
        var toolbar = __turbopack_require__(
          '[project]/node_modules/@react-pdf-viewer/toolbar/lib/index.js [app-ssr] (ecmascript)'
        );
        function _interopNamespaceDefault(e) {
          var n = Object.create(null);
          if (e) {
            Object.keys(e).forEach(function (k) {
              if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                  n,
                  k,
                  d.get
                    ? d
                    : {
                        enumerable: true,
                        get: function () {
                          return e[k];
                        },
                      }
                );
              }
            });
          }
          n.default = e;
          return Object.freeze(n);
        }
        var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);
        var BookmarkIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M11.5,1.5h11c0.552,0,1,0.448,1,1v20c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h3\n            M11.5,10.5c0,0.55-0.3,0.661-0.659,0.248L8,7.5l-2.844,3.246c-0.363,0.414-0.659,0.3-0.659-0.247v-9c0-0.552,0.448-1,1-1h5\n            c0.552,0,1,0.448,1,1L11.5,10.5z\n            M14.5,6.499h6\n            M14.5,10.499h6\n            M3.5,14.499h17\n            M3.5,18.499h16.497',
            })
          );
        };
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign =
          function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var FileIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M7.618,15.345l8.666-8.666c0.78-0.812,2.071-0.838,2.883-0.058s0.838,2.071,0.058,2.883\n            c-0.019,0.02-0.038,0.039-0.058,0.058L7.461,21.305c-1.593,1.593-4.175,1.592-5.767,0s-1.592-4.175,0-5.767c0,0,0,0,0,0\n            L13.928,3.305c2.189-2.19,5.739-2.19,7.929-0.001s2.19,5.739,0,7.929l0,0L13.192,19.9',
            })
          );
        };
        var ThumbnailIcon = function () {
          return React__namespace.createElement(
            core.Icon,
            {
              size: 16,
            },
            React__namespace.createElement('path', {
              d: 'M10.5,9.5c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V9.5z\n            M23.5,9.5c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V9.5z\n            M10.5,22.5 c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V22.5z\n            M23.5,22.5c0,0.552-0.448,1-1,1 h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V22.5z',
            })
          );
        };
        var TOOLTIP_OFFSET_LTR = {
          left: 8,
          top: 0,
        };
        var TOOLTIP_OFFSET_RTL = {
          left: -8,
          top: 0,
        };
        var Sidebar = function (_a) {
          var attachmentTabContent = _a.attachmentTabContent,
            bookmarkTabContent = _a.bookmarkTabContent,
            store = _a.store,
            thumbnailTabContent = _a.thumbnailTabContent,
            tabs = _a.tabs;
          var containerRef = React__namespace.useRef();
          var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
          var _b = React__namespace.useState(
              store.get('isCurrentTabOpened') || false
            ),
            opened = _b[0],
            setOpened = _b[1];
          var _c = React__namespace.useState(
              Math.max(store.get('currentTab') || 0, 0)
            ),
            currentTab = _c[0],
            setCurrentTab = _c[1];
          var direction = React__namespace.useContext(
            core.ThemeContext
          ).direction;
          var isRtl = direction === core.TextDirection.RightToLeft;
          var resizeConstrain = function (size) {
            return (
              size.firstHalfPercentage >= 20 && size.firstHalfPercentage <= 80
            );
          };
          var defaultTabs = [
            {
              content: thumbnailTabContent,
              icon: React__namespace.createElement(ThumbnailIcon, null),
              title:
                l10n && l10n.defaultLayout
                  ? l10n.defaultLayout.thumbnail
                  : 'Thumbnail',
            },
            {
              content: bookmarkTabContent,
              icon: React__namespace.createElement(BookmarkIcon, null),
              title:
                l10n && l10n.defaultLayout
                  ? l10n.defaultLayout.bookmark
                  : 'Bookmark',
            },
            {
              content: attachmentTabContent,
              icon: React__namespace.createElement(FileIcon, null),
              title:
                l10n && l10n.defaultLayout
                  ? l10n.defaultLayout.attachment
                  : 'Attachment',
            },
          ];
          var listTabs = tabs ? tabs(defaultTabs) : defaultTabs;
          var toggleTab = function (index) {
            if (currentTab === index) {
              store.update(
                'isCurrentTabOpened',
                !store.get('isCurrentTabOpened')
              );
              var container = containerRef.current;
              if (container) {
                var width = container.style.width;
                if (width) {
                  container.style.removeProperty('width');
                }
              }
            } else {
              store.update('currentTab', index);
            }
          };
          var switchToTab = function (index) {
            if (index >= 0 && index <= listTabs.length - 1) {
              store.update('isCurrentTabOpened', true);
              setCurrentTab(index);
            }
          };
          var handleCurrentTabOpened = function (opened) {
            setOpened(opened);
          };
          React__namespace.useEffect(function () {
            store.subscribe('currentTab', switchToTab);
            store.subscribe('isCurrentTabOpened', handleCurrentTabOpened);
            return function () {
              store.unsubscribe('currentTab', switchToTab);
              store.unsubscribe('isCurrentTabOpened', handleCurrentTabOpened);
            };
          }, []);
          if (listTabs.length === 0) {
            return React__namespace.createElement(
              React__namespace.Fragment,
              null
            );
          }
          return React__namespace.createElement(
            React__namespace.Fragment,
            null,
            React__namespace.createElement(
              'div',
              {
                'data-testid': 'default-layout__sidebar',
                className: core.classNames({
                  'rpv-default-layout__sidebar': true,
                  'rpv-default-layout__sidebar--opened': opened,
                  'rpv-default-layout__sidebar--ltr': !isRtl,
                  'rpv-default-layout__sidebar--rtl': isRtl,
                }),
                ref: containerRef,
              },
              React__namespace.createElement(
                'div',
                {
                  className: 'rpv-default-layout__sidebar-tabs',
                },
                React__namespace.createElement(
                  'div',
                  {
                    className: 'rpv-default-layout__sidebar-headers',
                    role: 'tablist',
                    'aria-orientation': 'vertical',
                  },
                  listTabs.map(function (tab, index) {
                    return React__namespace.createElement(
                      'div',
                      {
                        'aria-controls': 'rpv-default-layout__sidebar-content',
                        'aria-selected': currentTab === index,
                        key: index,
                        className: 'rpv-default-layout__sidebar-header',
                        id: 'rpv-default-layout__sidebar-tab-'.concat(index),
                        role: 'tab',
                      },
                      React__namespace.createElement(core.Tooltip, {
                        ariaControlsSuffix:
                          'default-layout-sidebar-tab-'.concat(index),
                        position: isRtl
                          ? core.Position.LeftCenter
                          : core.Position.RightCenter,
                        target: React__namespace.createElement(
                          core.MinimalButton,
                          {
                            ariaLabel: tab.title,
                            isSelected: currentTab === index,
                            onClick: function () {
                              return toggleTab(index);
                            },
                          },
                          tab.icon
                        ),
                        content: function () {
                          return tab.title;
                        },
                        offset: isRtl ? TOOLTIP_OFFSET_RTL : TOOLTIP_OFFSET_LTR,
                      })
                    );
                  })
                ),
                React__namespace.createElement(
                  'div',
                  {
                    'aria-labelledby':
                      'rpv-default-layout__sidebar-tab-'.concat(currentTab),
                    id: 'rpv-default-layout__sidebar-content',
                    className: core.classNames({
                      'rpv-default-layout__sidebar-content': true,
                      'rpv-default-layout__sidebar-content--opened': opened,
                      'rpv-default-layout__sidebar-content--ltr': !isRtl,
                      'rpv-default-layout__sidebar-content--rtl': isRtl,
                    }),
                    role: 'tabpanel',
                    tabIndex: -1,
                  },
                  listTabs[currentTab].content
                )
              )
            ),
            opened &&
              React__namespace.createElement(core.Splitter, {
                constrain: resizeConstrain,
              })
          );
        };
        var defaultLayoutPlugin = function (props) {
          var store = React__namespace.useMemo(function () {
            return core.createStore({
              isCurrentTabOpened: false,
              currentTab: 0,
            });
          }, []);
          var attachmentPluginInstance = attachment.attachmentPlugin();
          var bookmarkPluginInstance = bookmark.bookmarkPlugin();
          var thumbnailPluginInstance = thumbnail.thumbnailPlugin(
            props ? props.thumbnailPlugin : {}
          );
          var toolbarPluginInstance = toolbar.toolbarPlugin(
            props ? props.toolbarPlugin : {}
          );
          var Attachments = attachmentPluginInstance.Attachments;
          var Bookmarks = bookmarkPluginInstance.Bookmarks;
          var Thumbnails = thumbnailPluginInstance.Thumbnails;
          var Toolbar = toolbarPluginInstance.Toolbar;
          var sidebarTabs = props
            ? props.sidebarTabs
            : function (defaultTabs) {
                return defaultTabs;
              };
          var plugins = [
            attachmentPluginInstance,
            bookmarkPluginInstance,
            thumbnailPluginInstance,
            toolbarPluginInstance,
          ];
          return {
            attachmentPluginInstance: attachmentPluginInstance,
            bookmarkPluginInstance: bookmarkPluginInstance,
            thumbnailPluginInstance: thumbnailPluginInstance,
            toolbarPluginInstance: toolbarPluginInstance,
            activateTab: function (index) {
              store.update('currentTab', index);
            },
            toggleTab: function (index) {
              var currentTab = store.get('currentTab');
              store.update(
                'isCurrentTabOpened',
                !store.get('isCurrentTabOpened')
              );
              if (currentTab !== index) {
                store.update('currentTab', index);
              }
            },
            install: function (pluginFunctions) {
              plugins.forEach(function (plugin) {
                if (plugin.install) {
                  plugin.install(pluginFunctions);
                }
              });
            },
            renderPageLayer: function (renderProps) {
              return React__namespace.createElement(
                React__namespace.Fragment,
                null,
                plugins.map(function (plugin, idx) {
                  return plugin.renderPageLayer
                    ? React__namespace.createElement(
                        React__namespace.Fragment,
                        {
                          key: idx,
                        },
                        plugin.renderPageLayer(renderProps)
                      )
                    : React__namespace.createElement(
                        React__namespace.Fragment,
                        {
                          key: idx,
                        },
                        React__namespace.createElement(
                          React__namespace.Fragment,
                          null
                        )
                      );
                })
              );
            },
            renderViewer: function (renderProps) {
              var slot = renderProps.slot;
              plugins.forEach(function (plugin) {
                if (plugin.renderViewer) {
                  slot = plugin.renderViewer(
                    __assign(__assign({}, renderProps), {
                      slot: slot,
                    })
                  );
                }
              });
              var mergeSubSlot =
                slot.subSlot && slot.subSlot.attrs
                  ? {
                      className: slot.subSlot.attrs.className,
                      'data-testid': slot.subSlot.attrs['data-testid'],
                      ref: slot.subSlot.attrs.ref,
                      style: slot.subSlot.attrs.style,
                    }
                  : {};
              slot.children = React__namespace.createElement(
                'div',
                {
                  className: 'rpv-default-layout__container',
                },
                React__namespace.createElement(
                  'div',
                  {
                    'data-testid': 'default-layout__main',
                    className: core.classNames({
                      'rpv-default-layout__main': true,
                      'rpv-default-layout__main--rtl':
                        renderProps.themeContext.direction ===
                        core.TextDirection.RightToLeft,
                    }),
                  },
                  React__namespace.createElement(Sidebar, {
                    attachmentTabContent: React__namespace.createElement(
                      Attachments,
                      null
                    ),
                    bookmarkTabContent: React__namespace.createElement(
                      Bookmarks,
                      null
                    ),
                    store: store,
                    thumbnailTabContent: React__namespace.createElement(
                      Thumbnails,
                      null
                    ),
                    tabs: sidebarTabs,
                  }),
                  React__namespace.createElement(
                    'div',
                    {
                      className: 'rpv-default-layout__body',
                      'data-testid': 'default-layout__body',
                    },
                    React__namespace.createElement(
                      'div',
                      {
                        className: 'rpv-default-layout__toolbar',
                      },
                      props && props.renderToolbar
                        ? props.renderToolbar(Toolbar)
                        : React__namespace.createElement(Toolbar, null)
                    ),
                    React__namespace.createElement(
                      'div',
                      __assign({}, mergeSubSlot),
                      slot.subSlot.children
                    )
                  )
                ),
                slot.children
              );
              slot.subSlot.attrs = {};
              slot.subSlot.children = React__namespace.createElement(
                React__namespace.Fragment,
                null
              );
              return slot;
            },
            uninstall: function (pluginFunctions) {
              plugins.forEach(function (plugin) {
                if (plugin.uninstall) {
                  plugin.uninstall(pluginFunctions);
                }
              });
            },
            onDocumentLoad: function (documentLoadProps) {
              plugins.forEach(function (plugin) {
                if (plugin.onDocumentLoad) {
                  plugin.onDocumentLoad(documentLoadProps);
                }
              });
              if (props && props.setInitialTab) {
                props
                  .setInitialTab(documentLoadProps.doc)
                  .then(function (initialTab) {
                    store.update('currentTab', initialTab);
                    store.update('isCurrentTabOpened', true);
                  });
              }
            },
            onAnnotationLayerRender: function (props) {
              plugins.forEach(function (plugin) {
                if (plugin.onAnnotationLayerRender) {
                  plugin.onAnnotationLayerRender(props);
                }
              });
            },
            onTextLayerRender: function (props) {
              plugins.forEach(function (plugin) {
                if (plugin.onTextLayerRender) {
                  plugin.onTextLayerRender(props);
                }
              });
            },
            onViewerStateChange: function (viewerState) {
              var newState = viewerState;
              plugins.forEach(function (plugin) {
                if (plugin.onViewerStateChange) {
                  newState = plugin.onViewerStateChange(newState);
                }
              });
              return newState;
            },
          };
        };
        var setInitialTabFromPageMode = function (doc) {
          return new Promise(function (resolve, _) {
            doc.getPageMode().then(function (pageMode) {
              if (!pageMode) {
                resolve(-1);
              } else {
                switch (pageMode) {
                  case core.PageMode.Attachments:
                    resolve(2);
                    break;
                  case core.PageMode.Bookmarks:
                    resolve(1);
                    break;
                  case core.PageMode.Thumbnails:
                    resolve(0);
                    break;
                  default:
                    resolve(-1);
                    break;
                }
              }
            });
          });
        };
        exports.BookmarkIcon = BookmarkIcon;
        exports.FileIcon = FileIcon;
        exports.ThumbnailIcon = ThumbnailIcon;
        exports.defaultLayoutPlugin = defaultLayoutPlugin;
        exports.setInitialTabFromPageMode = setInitialTabFromPageMode;
      }
    },
  '[project]/node_modules/@react-pdf-viewer/default-layout/lib/index.js [app-ssr] (ecmascript)':
    function (__turbopack_context__) {
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
        m: module,
        e: exports,
        t: __turbopack_require_real__,
      } = __turbopack_context__;
      {
        /**
         * A React component to view a PDF document
         *
         * @see https://react-pdf-viewer.dev
         * @license https://react-pdf-viewer.dev/license
         * @copyright 2019-2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */ ('use strict');
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          module.exports = __turbopack_require__(
            '[project]/node_modules/@react-pdf-viewer/default-layout/lib/cjs/default-layout.js [app-ssr] (ecmascript)'
          );
        }
      }
    },
};

//# sourceMappingURL=08b5e_%40react-pdf-viewer_beb03d._.js.map
