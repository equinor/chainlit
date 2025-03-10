import {
  b as $e,
  e as B,
  l as De,
  r as E,
  k as Ee,
  a as Fe,
  m as He,
  g as Ie,
  d as Me,
  T as Pe,
  f as Ve,
  A as _e,
  L as he,
  P as j,
  h as re,
  j as v,
  u as ve,
  c as xe,
  i as ye
} from './index-D7lZEN9m.js';

/**
 * table-core
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function I(e, o) {
  return typeof e == 'function' ? e(o) : e;
}
function x(e, o) {
  return (t) => {
    o.setState((n) => ({ ...n, [e]: I(t, n[e]) }));
  };
}
function O(e) {
  return e instanceof Function;
}
function Ae(e) {
  return Array.isArray(e) && e.every((o) => typeof o == 'number');
}
function Ge(e, o) {
  const t = [],
    n = (i) => {
      i.forEach((r) => {
        t.push(r);
        const l = o(r);
        l != null && l.length && n(l);
      });
    };
  return n(e), t;
}
function m(e, o, t) {
  let n = [],
    i;
  return (r) => {
    let l;
    t.key && t.debug && (l = Date.now());
    const s = e(r);
    if (!(s.length !== n.length || s.some((d, f) => n[f] !== d))) return i;
    n = s;
    let a;
    if (
      (t.key && t.debug && (a = Date.now()),
      (i = o(...s)),
      t == null || t.onChange == null || t.onChange(i),
      t.key && t.debug && t != null && t.debug())
    ) {
      const d = Math.round((Date.now() - l) * 100) / 100,
        f = Math.round((Date.now() - a) * 100) / 100,
        c = f / 16,
        g = (p, S) => {
          for (p = String(p); p.length < S; ) p = ' ' + p;
          return p;
        };
      console.info(
        `%c⏱ ${g(f, 5)} /${g(d, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
              0,
              Math.min(120 - 120 * c, 120)
            )}deg 100% 31%);`,
        t == null ? void 0 : t.key
      );
    }
    return i;
  };
}
function C(e, o, t, n) {
  return {
    debug: () => {
      var i;
      return (i = e == null ? void 0 : e.debugAll) != null ? i : e[o];
    },
    key: !1,
    onChange: n
  };
}
function ze(e, o, t, n) {
  const i = () => {
      var l;
      return (l = r.getValue()) != null ? l : e.options.renderFallbackValue;
    },
    r = {
      id: `${o.id}_${t.id}`,
      row: o,
      column: t,
      getValue: () => o.getValue(n),
      renderValue: i,
      getContext: m(
        () => [e, t, o, r],
        (l, s, u, a) => ({
          table: l,
          column: s,
          row: u,
          cell: a,
          getValue: a.getValue,
          renderValue: a.renderValue
        }),
        C(e.options, 'debugCells')
      )
    };
  return (
    e._features.forEach((l) => {
      l.createCell == null || l.createCell(r, t, o, e);
    }, {}),
    r
  );
}
function Le(e, o, t, n) {
  var i, r;
  const s = { ...e._getDefaultColumnDef(), ...o },
    u = s.accessorKey;
  let a =
      (i =
        (r = s.id) != null
          ? r
          : u
          ? typeof String.prototype.replaceAll == 'function'
            ? u.replaceAll('.', '_')
            : u.replace(/\./g, '_')
          : void 0) != null
        ? i
        : typeof s.header == 'string'
        ? s.header
        : void 0,
    d;
  if (
    (s.accessorFn
      ? (d = s.accessorFn)
      : u &&
        (u.includes('.')
          ? (d = (c) => {
              let g = c;
              for (const S of u.split('.')) {
                var p;
                g = (p = g) == null ? void 0 : p[S];
              }
              return g;
            })
          : (d = (c) => c[s.accessorKey])),
    !a)
  )
    throw new Error();
  let f = {
    id: `${String(a)}`,
    accessorFn: d,
    parent: n,
    depth: t,
    columnDef: s,
    columns: [],
    getFlatColumns: m(
      () => [!0],
      () => {
        var c;
        return [
          f,
          ...((c = f.columns) == null
            ? void 0
            : c.flatMap((g) => g.getFlatColumns()))
        ];
      },
      C(e.options, 'debugColumns')
    ),
    getLeafColumns: m(
      () => [e._getOrderColumnsFn()],
      (c) => {
        var g;
        if ((g = f.columns) != null && g.length) {
          let p = f.columns.flatMap((S) => S.getLeafColumns());
          return c(p);
        }
        return [f];
      },
      C(e.options, 'debugColumns')
    )
  };
  for (const c of e._features) c.createColumn == null || c.createColumn(f, e);
  return f;
}
const F = 'debugHeaders';
function le(e, o, t) {
  var n;
  let r = {
    id: (n = t.id) != null ? n : o.id,
    column: o,
    index: t.index,
    isPlaceholder: !!t.isPlaceholder,
    placeholderId: t.placeholderId,
    depth: t.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const l = [],
        s = (u) => {
          u.subHeaders && u.subHeaders.length && u.subHeaders.map(s), l.push(u);
        };
      return s(r), l;
    },
    getContext: () => ({ table: e, header: r, column: o })
  };
  return (
    e._features.forEach((l) => {
      l.createHeader == null || l.createHeader(r, e);
    }),
    r
  );
}
const Oe = {
  createTable: (e) => {
    (e.getHeaderGroups = m(
      () => [
        e.getAllColumns(),
        e.getVisibleLeafColumns(),
        e.getState().columnPinning.left,
        e.getState().columnPinning.right
      ],
      (o, t, n, i) => {
        var r, l;
        const s =
            (r =
              n == null
                ? void 0
                : n.map((f) => t.find((c) => c.id === f)).filter(Boolean)) !=
            null
              ? r
              : [],
          u =
            (l =
              i == null
                ? void 0
                : i.map((f) => t.find((c) => c.id === f)).filter(Boolean)) !=
            null
              ? l
              : [],
          a = t.filter(
            (f) =>
              !(n != null && n.includes(f.id)) &&
              !(i != null && i.includes(f.id))
          );
        return G(o, [...s, ...a, ...u], e);
      },
      C(e.options, F)
    )),
      (e.getCenterHeaderGroups = m(
        () => [
          e.getAllColumns(),
          e.getVisibleLeafColumns(),
          e.getState().columnPinning.left,
          e.getState().columnPinning.right
        ],
        (o, t, n, i) => (
          (t = t.filter(
            (r) =>
              !(n != null && n.includes(r.id)) &&
              !(i != null && i.includes(r.id))
          )),
          G(o, t, e, 'center')
        ),
        C(e.options, F)
      )),
      (e.getLeftHeaderGroups = m(
        () => [
          e.getAllColumns(),
          e.getVisibleLeafColumns(),
          e.getState().columnPinning.left
        ],
        (o, t, n) => {
          var i;
          const r =
            (i =
              n == null
                ? void 0
                : n.map((l) => t.find((s) => s.id === l)).filter(Boolean)) !=
            null
              ? i
              : [];
          return G(o, r, e, 'left');
        },
        C(e.options, F)
      )),
      (e.getRightHeaderGroups = m(
        () => [
          e.getAllColumns(),
          e.getVisibleLeafColumns(),
          e.getState().columnPinning.right
        ],
        (o, t, n) => {
          var i;
          const r =
            (i =
              n == null
                ? void 0
                : n.map((l) => t.find((s) => s.id === l)).filter(Boolean)) !=
            null
              ? i
              : [];
          return G(o, r, e, 'right');
        },
        C(e.options, F)
      )),
      (e.getFooterGroups = m(
        () => [e.getHeaderGroups()],
        (o) => [...o].reverse(),
        C(e.options, F)
      )),
      (e.getLeftFooterGroups = m(
        () => [e.getLeftHeaderGroups()],
        (o) => [...o].reverse(),
        C(e.options, F)
      )),
      (e.getCenterFooterGroups = m(
        () => [e.getCenterHeaderGroups()],
        (o) => [...o].reverse(),
        C(e.options, F)
      )),
      (e.getRightFooterGroups = m(
        () => [e.getRightHeaderGroups()],
        (o) => [...o].reverse(),
        C(e.options, F)
      )),
      (e.getFlatHeaders = m(
        () => [e.getHeaderGroups()],
        (o) => o.map((t) => t.headers).flat(),
        C(e.options, F)
      )),
      (e.getLeftFlatHeaders = m(
        () => [e.getLeftHeaderGroups()],
        (o) => o.map((t) => t.headers).flat(),
        C(e.options, F)
      )),
      (e.getCenterFlatHeaders = m(
        () => [e.getCenterHeaderGroups()],
        (o) => o.map((t) => t.headers).flat(),
        C(e.options, F)
      )),
      (e.getRightFlatHeaders = m(
        () => [e.getRightHeaderGroups()],
        (o) => o.map((t) => t.headers).flat(),
        C(e.options, F)
      )),
      (e.getCenterLeafHeaders = m(
        () => [e.getCenterFlatHeaders()],
        (o) =>
          o.filter((t) => {
            var n;
            return !((n = t.subHeaders) != null && n.length);
          }),
        C(e.options, F)
      )),
      (e.getLeftLeafHeaders = m(
        () => [e.getLeftFlatHeaders()],
        (o) =>
          o.filter((t) => {
            var n;
            return !((n = t.subHeaders) != null && n.length);
          }),
        C(e.options, F)
      )),
      (e.getRightLeafHeaders = m(
        () => [e.getRightFlatHeaders()],
        (o) =>
          o.filter((t) => {
            var n;
            return !((n = t.subHeaders) != null && n.length);
          }),
        C(e.options, F)
      )),
      (e.getLeafHeaders = m(
        () => [
          e.getLeftHeaderGroups(),
          e.getCenterHeaderGroups(),
          e.getRightHeaderGroups()
        ],
        (o, t, n) => {
          var i, r, l, s, u, a;
          return [
            ...((i = (r = o[0]) == null ? void 0 : r.headers) != null ? i : []),
            ...((l = (s = t[0]) == null ? void 0 : s.headers) != null ? l : []),
            ...((u = (a = n[0]) == null ? void 0 : a.headers) != null ? u : [])
          ]
            .map((d) => d.getLeafHeaders())
            .flat();
        },
        C(e.options, F)
      ));
  }
};
function G(e, o, t, n) {
  var i, r;
  let l = 0;
  const s = function (c, g) {
    g === void 0 && (g = 1),
      (l = Math.max(l, g)),
      c
        .filter((p) => p.getIsVisible())
        .forEach((p) => {
          var S;
          (S = p.columns) != null && S.length && s(p.columns, g + 1);
        }, 0);
  };
  s(e);
  let u = [];
  const a = (c, g) => {
      const p = {
          depth: g,
          id: [n, `${g}`].filter(Boolean).join('_'),
          headers: []
        },
        S = [];
      c.forEach((w) => {
        const R = [...S].reverse()[0],
          h = w.column.depth === p.depth;
        let _,
          M = !1;
        if (
          (h && w.column.parent
            ? (_ = w.column.parent)
            : ((_ = w.column), (M = !0)),
          R && (R == null ? void 0 : R.column) === _)
        )
          R.subHeaders.push(w);
        else {
          const $ = le(t, _, {
            id: [n, g, _.id, w == null ? void 0 : w.id]
              .filter(Boolean)
              .join('_'),
            isPlaceholder: M,
            placeholderId: M
              ? `${S.filter((D) => D.column === _).length}`
              : void 0,
            depth: g,
            index: S.length
          });
          $.subHeaders.push(w), S.push($);
        }
        p.headers.push(w), (w.headerGroup = p);
      }),
        u.push(p),
        g > 0 && a(S, g - 1);
    },
    d = o.map((c, g) => le(t, c, { depth: l, index: g }));
  a(d, l - 1), u.reverse();
  const f = (c) =>
    c
      .filter((p) => p.column.getIsVisible())
      .map((p) => {
        let S = 0,
          w = 0,
          R = [0];
        p.subHeaders && p.subHeaders.length
          ? ((R = []),
            f(p.subHeaders).forEach((_) => {
              let { colSpan: M, rowSpan: $ } = _;
              (S += M), R.push($);
            }))
          : (S = 1);
        const h = Math.min(...R);
        return (
          (w = w + h),
          (p.colSpan = S),
          (p.rowSpan = w),
          { colSpan: S, rowSpan: w }
        );
      });
  return f((i = (r = u[0]) == null ? void 0 : r.headers) != null ? i : []), u;
}
const je = (e, o, t, n, i, r, l) => {
    let s = {
      id: o,
      index: n,
      original: t,
      depth: i,
      parentId: l,
      _valuesCache: {},
      _uniqueValuesCache: {},
      getValue: (u) => {
        if (s._valuesCache.hasOwnProperty(u)) return s._valuesCache[u];
        const a = e.getColumn(u);
        if (a != null && a.accessorFn)
          return (
            (s._valuesCache[u] = a.accessorFn(s.original, n)), s._valuesCache[u]
          );
      },
      getUniqueValues: (u) => {
        if (s._uniqueValuesCache.hasOwnProperty(u))
          return s._uniqueValuesCache[u];
        const a = e.getColumn(u);
        if (a != null && a.accessorFn)
          return a.columnDef.getUniqueValues
            ? ((s._uniqueValuesCache[u] = a.columnDef.getUniqueValues(
                s.original,
                n
              )),
              s._uniqueValuesCache[u])
            : ((s._uniqueValuesCache[u] = [s.getValue(u)]),
              s._uniqueValuesCache[u]);
      },
      renderValue: (u) => {
        var a;
        return (a = s.getValue(u)) != null ? a : e.options.renderFallbackValue;
      },
      subRows: [],
      getLeafRows: () => Ge(s.subRows, (u) => u.subRows),
      getParentRow: () => (s.parentId ? e.getRow(s.parentId, !0) : void 0),
      getParentRows: () => {
        let u = [],
          a = s;
        for (;;) {
          const d = a.getParentRow();
          if (!d) break;
          u.push(d), (a = d);
        }
        return u.reverse();
      },
      getAllCells: m(
        () => [e.getAllLeafColumns()],
        (u) => u.map((a) => ze(e, s, a, a.id)),
        C(e.options, 'debugRows')
      ),
      _getAllCellsByColumnId: m(
        () => [s.getAllCells()],
        (u) => u.reduce((a, d) => ((a[d.column.id] = d), a), {}),
        C(e.options, 'debugRows')
      )
    };
    for (let u = 0; u < e._features.length; u++) {
      const a = e._features[u];
      a == null || a.createRow == null || a.createRow(s, e);
    }
    return s;
  },
  Be = {
    createColumn: (e, o) => {
      (e._getFacetedRowModel =
        o.options.getFacetedRowModel && o.options.getFacetedRowModel(o, e.id)),
        (e.getFacetedRowModel = () =>
          e._getFacetedRowModel
            ? e._getFacetedRowModel()
            : o.getPreFilteredRowModel()),
        (e._getFacetedUniqueValues =
          o.options.getFacetedUniqueValues &&
          o.options.getFacetedUniqueValues(o, e.id)),
        (e.getFacetedUniqueValues = () =>
          e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : new Map()),
        (e._getFacetedMinMaxValues =
          o.options.getFacetedMinMaxValues &&
          o.options.getFacetedMinMaxValues(o, e.id)),
        (e.getFacetedMinMaxValues = () => {
          if (e._getFacetedMinMaxValues) return e._getFacetedMinMaxValues();
        });
    }
  },
  ae = (e, o, t) => {
    var n, i;
    const r =
      t == null || (n = t.toString()) == null ? void 0 : n.toLowerCase();
    return !!(
      !(
        (i = e.getValue(o)) == null ||
        (i = i.toString()) == null ||
        (i = i.toLowerCase()) == null
      ) && i.includes(r)
    );
  };
ae.autoRemove = (e) => P(e);
const ge = (e, o, t) => {
  var n;
  return !!(
    !((n = e.getValue(o)) == null || (n = n.toString()) == null) &&
    n.includes(t)
  );
};
ge.autoRemove = (e) => P(e);
const de = (e, o, t) => {
  var n;
  return (
    ((n = e.getValue(o)) == null || (n = n.toString()) == null
      ? void 0
      : n.toLowerCase()) === (t == null ? void 0 : t.toLowerCase())
  );
};
de.autoRemove = (e) => P(e);
const ce = (e, o, t) => {
  var n;
  return (n = e.getValue(o)) == null ? void 0 : n.includes(t);
};
ce.autoRemove = (e) => P(e) || !(e != null && e.length);
const fe = (e, o, t) =>
  !t.some((n) => {
    var i;
    return !((i = e.getValue(o)) != null && i.includes(n));
  });
fe.autoRemove = (e) => P(e) || !(e != null && e.length);
const pe = (e, o, t) =>
  t.some((n) => {
    var i;
    return (i = e.getValue(o)) == null ? void 0 : i.includes(n);
  });
pe.autoRemove = (e) => P(e) || !(e != null && e.length);
const Se = (e, o, t) => e.getValue(o) === t;
Se.autoRemove = (e) => P(e);
const me = (e, o, t) => e.getValue(o) == t;
me.autoRemove = (e) => P(e);
const b = (e, o, t) => {
  let [n, i] = t;
  const r = e.getValue(o);
  return r >= n && r <= i;
};
b.resolveFilterValue = (e) => {
  let [o, t] = e,
    n = typeof o != 'number' ? parseFloat(o) : o,
    i = typeof t != 'number' ? parseFloat(t) : t,
    r = o === null || Number.isNaN(n) ? -1 / 0 : n,
    l = t === null || Number.isNaN(i) ? 1 / 0 : i;
  if (r > l) {
    const s = r;
    (r = l), (l = s);
  }
  return [r, l];
};
b.autoRemove = (e) => P(e) || (P(e[0]) && P(e[1]));
const V = {
  includesString: ae,
  includesStringSensitive: ge,
  equalsString: de,
  arrIncludes: ce,
  arrIncludesAll: fe,
  arrIncludesSome: pe,
  equals: Se,
  weakEquals: me,
  inNumberRange: b
};
function P(e) {
  return e == null || e === '';
}
const Te = {
  getDefaultColumnDef: () => ({ filterFn: 'auto' }),
  getInitialState: (e) => ({ columnFilters: [], ...e }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: x('columnFilters', e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, o) => {
    (e.getAutoFilterFn = () => {
      const t = o.getCoreRowModel().flatRows[0],
        n = t == null ? void 0 : t.getValue(e.id);
      return typeof n == 'string'
        ? V.includesString
        : typeof n == 'number'
        ? V.inNumberRange
        : typeof n == 'boolean' || (n !== null && typeof n == 'object')
        ? V.equals
        : Array.isArray(n)
        ? V.arrIncludes
        : V.weakEquals;
    }),
      (e.getFilterFn = () => {
        var t, n;
        return O(e.columnDef.filterFn)
          ? e.columnDef.filterFn
          : e.columnDef.filterFn === 'auto'
          ? e.getAutoFilterFn()
          : (t =
              (n = o.options.filterFns) == null
                ? void 0
                : n[e.columnDef.filterFn]) != null
          ? t
          : V[e.columnDef.filterFn];
      }),
      (e.getCanFilter = () => {
        var t, n, i;
        return (
          ((t = e.columnDef.enableColumnFilter) != null ? t : !0) &&
          ((n = o.options.enableColumnFilters) != null ? n : !0) &&
          ((i = o.options.enableFilters) != null ? i : !0) &&
          !!e.accessorFn
        );
      }),
      (e.getIsFiltered = () => e.getFilterIndex() > -1),
      (e.getFilterValue = () => {
        var t;
        return (t = o.getState().columnFilters) == null ||
          (t = t.find((n) => n.id === e.id)) == null
          ? void 0
          : t.value;
      }),
      (e.getFilterIndex = () => {
        var t, n;
        return (t =
          (n = o.getState().columnFilters) == null
            ? void 0
            : n.findIndex((i) => i.id === e.id)) != null
          ? t
          : -1;
      }),
      (e.setFilterValue = (t) => {
        o.setColumnFilters((n) => {
          const i = e.getFilterFn(),
            r = n == null ? void 0 : n.find((d) => d.id === e.id),
            l = I(t, r ? r.value : void 0);
          if (se(i, l, e)) {
            var s;
            return (s = n == null ? void 0 : n.filter((d) => d.id !== e.id)) !=
              null
              ? s
              : [];
          }
          const u = { id: e.id, value: l };
          if (r) {
            var a;
            return (a =
              n == null ? void 0 : n.map((d) => (d.id === e.id ? u : d))) !=
              null
              ? a
              : [];
          }
          return n != null && n.length ? [...n, u] : [u];
        });
      });
  },
  createRow: (e, o) => {
    (e.columnFilters = {}), (e.columnFiltersMeta = {});
  },
  createTable: (e) => {
    (e.setColumnFilters = (o) => {
      const t = e.getAllLeafColumns(),
        n = (i) => {
          var r;
          return (r = I(o, i)) == null
            ? void 0
            : r.filter((l) => {
                const s = t.find((u) => u.id === l.id);
                if (s) {
                  const u = s.getFilterFn();
                  if (se(u, l.value, s)) return !1;
                }
                return !0;
              });
        };
      e.options.onColumnFiltersChange == null ||
        e.options.onColumnFiltersChange(n);
    }),
      (e.resetColumnFilters = (o) => {
        var t, n;
        e.setColumnFilters(
          o
            ? []
            : (t = (n = e.initialState) == null ? void 0 : n.columnFilters) !=
              null
            ? t
            : []
        );
      }),
      (e.getPreFilteredRowModel = () => e.getCoreRowModel()),
      (e.getFilteredRowModel = () => (
        !e._getFilteredRowModel &&
          e.options.getFilteredRowModel &&
          (e._getFilteredRowModel = e.options.getFilteredRowModel(e)),
        e.options.manualFiltering || !e._getFilteredRowModel
          ? e.getPreFilteredRowModel()
          : e._getFilteredRowModel()
      ));
  }
};
function se(e, o, t) {
  return (
    (e && e.autoRemove ? e.autoRemove(o, t) : !1) ||
    typeof o > 'u' ||
    (typeof o == 'string' && !o)
  );
}
const Ne = (e, o, t) =>
    t.reduce((n, i) => {
      const r = i.getValue(e);
      return n + (typeof r == 'number' ? r : 0);
    }, 0),
  ke = (e, o, t) => {
    let n;
    return (
      t.forEach((i) => {
        const r = i.getValue(e);
        r != null && (n > r || (n === void 0 && r >= r)) && (n = r);
      }),
      n
    );
  },
  qe = (e, o, t) => {
    let n;
    return (
      t.forEach((i) => {
        const r = i.getValue(e);
        r != null && (n < r || (n === void 0 && r >= r)) && (n = r);
      }),
      n
    );
  },
  Ue = (e, o, t) => {
    let n, i;
    return (
      t.forEach((r) => {
        const l = r.getValue(e);
        l != null &&
          (n === void 0
            ? l >= l && (n = i = l)
            : (n > l && (n = l), i < l && (i = l)));
      }),
      [n, i]
    );
  },
  Xe = (e, o) => {
    let t = 0,
      n = 0;
    if (
      (o.forEach((i) => {
        let r = i.getValue(e);
        r != null && (r = +r) >= r && (++t, (n += r));
      }),
      t)
    )
      return n / t;
  },
  Ke = (e, o) => {
    if (!o.length) return;
    const t = o.map((r) => r.getValue(e));
    if (!Ae(t)) return;
    if (t.length === 1) return t[0];
    const n = Math.floor(t.length / 2),
      i = t.sort((r, l) => r - l);
    return t.length % 2 !== 0 ? i[n] : (i[n - 1] + i[n]) / 2;
  },
  Je = (e, o) => Array.from(new Set(o.map((t) => t.getValue(e))).values()),
  Qe = (e, o) => new Set(o.map((t) => t.getValue(e))).size,
  We = (e, o) => o.length,
  T = {
    sum: Ne,
    min: ke,
    max: qe,
    extent: Ue,
    mean: Xe,
    median: Ke,
    unique: Je,
    uniqueCount: Qe,
    count: We
  },
  Ye = {
    getDefaultColumnDef: () => ({
      aggregatedCell: (e) => {
        var o, t;
        return (o =
          (t = e.getValue()) == null || t.toString == null
            ? void 0
            : t.toString()) != null
          ? o
          : null;
      },
      aggregationFn: 'auto'
    }),
    getInitialState: (e) => ({ grouping: [], ...e }),
    getDefaultOptions: (e) => ({
      onGroupingChange: x('grouping', e),
      groupedColumnMode: 'reorder'
    }),
    createColumn: (e, o) => {
      (e.toggleGrouping = () => {
        o.setGrouping((t) =>
          t != null && t.includes(e.id)
            ? t.filter((n) => n !== e.id)
            : [...(t ?? []), e.id]
        );
      }),
        (e.getCanGroup = () => {
          var t, n;
          return (
            ((t = e.columnDef.enableGrouping) != null ? t : !0) &&
            ((n = o.options.enableGrouping) != null ? n : !0) &&
            (!!e.accessorFn || !!e.columnDef.getGroupingValue)
          );
        }),
        (e.getIsGrouped = () => {
          var t;
          return (t = o.getState().grouping) == null
            ? void 0
            : t.includes(e.id);
        }),
        (e.getGroupedIndex = () => {
          var t;
          return (t = o.getState().grouping) == null ? void 0 : t.indexOf(e.id);
        }),
        (e.getToggleGroupingHandler = () => {
          const t = e.getCanGroup();
          return () => {
            t && e.toggleGrouping();
          };
        }),
        (e.getAutoAggregationFn = () => {
          const t = o.getCoreRowModel().flatRows[0],
            n = t == null ? void 0 : t.getValue(e.id);
          if (typeof n == 'number') return T.sum;
          if (Object.prototype.toString.call(n) === '[object Date]')
            return T.extent;
        }),
        (e.getAggregationFn = () => {
          var t, n;
          if (!e) throw new Error();
          return O(e.columnDef.aggregationFn)
            ? e.columnDef.aggregationFn
            : e.columnDef.aggregationFn === 'auto'
            ? e.getAutoAggregationFn()
            : (t =
                (n = o.options.aggregationFns) == null
                  ? void 0
                  : n[e.columnDef.aggregationFn]) != null
            ? t
            : T[e.columnDef.aggregationFn];
        });
    },
    createTable: (e) => {
      (e.setGrouping = (o) =>
        e.options.onGroupingChange == null
          ? void 0
          : e.options.onGroupingChange(o)),
        (e.resetGrouping = (o) => {
          var t, n;
          e.setGrouping(
            o
              ? []
              : (t = (n = e.initialState) == null ? void 0 : n.grouping) != null
              ? t
              : []
          );
        }),
        (e.getPreGroupedRowModel = () => e.getFilteredRowModel()),
        (e.getGroupedRowModel = () => (
          !e._getGroupedRowModel &&
            e.options.getGroupedRowModel &&
            (e._getGroupedRowModel = e.options.getGroupedRowModel(e)),
          e.options.manualGrouping || !e._getGroupedRowModel
            ? e.getPreGroupedRowModel()
            : e._getGroupedRowModel()
        ));
    },
    createRow: (e, o) => {
      (e.getIsGrouped = () => !!e.groupingColumnId),
        (e.getGroupingValue = (t) => {
          if (e._groupingValuesCache.hasOwnProperty(t))
            return e._groupingValuesCache[t];
          const n = o.getColumn(t);
          return n != null && n.columnDef.getGroupingValue
            ? ((e._groupingValuesCache[t] = n.columnDef.getGroupingValue(
                e.original
              )),
              e._groupingValuesCache[t])
            : e.getValue(t);
        }),
        (e._groupingValuesCache = {});
    },
    createCell: (e, o, t, n) => {
      (e.getIsGrouped = () => o.getIsGrouped() && o.id === t.groupingColumnId),
        (e.getIsPlaceholder = () => !e.getIsGrouped() && o.getIsGrouped()),
        (e.getIsAggregated = () => {
          var i;
          return (
            !e.getIsGrouped() &&
            !e.getIsPlaceholder() &&
            !!((i = t.subRows) != null && i.length)
          );
        });
    }
  };
function Ze(e, o, t) {
  if (!(o != null && o.length) || !t) return e;
  const n = e.filter((r) => !o.includes(r.id));
  return t === 'remove'
    ? n
    : [...o.map((r) => e.find((l) => l.id === r)).filter(Boolean), ...n];
}
const be = {
    getInitialState: (e) => ({ columnOrder: [], ...e }),
    getDefaultOptions: (e) => ({ onColumnOrderChange: x('columnOrder', e) }),
    createColumn: (e, o) => {
      (e.getIndex = m(
        (t) => [A(o, t)],
        (t) => t.findIndex((n) => n.id === e.id),
        C(o.options, 'debugColumns')
      )),
        (e.getIsFirstColumn = (t) => {
          var n;
          return ((n = A(o, t)[0]) == null ? void 0 : n.id) === e.id;
        }),
        (e.getIsLastColumn = (t) => {
          var n;
          const i = A(o, t);
          return ((n = i[i.length - 1]) == null ? void 0 : n.id) === e.id;
        });
    },
    createTable: (e) => {
      (e.setColumnOrder = (o) =>
        e.options.onColumnOrderChange == null
          ? void 0
          : e.options.onColumnOrderChange(o)),
        (e.resetColumnOrder = (o) => {
          var t;
          e.setColumnOrder(
            o ? [] : (t = e.initialState.columnOrder) != null ? t : []
          );
        }),
        (e._getOrderColumnsFn = m(
          () => [
            e.getState().columnOrder,
            e.getState().grouping,
            e.options.groupedColumnMode
          ],
          (o, t, n) => (i) => {
            let r = [];
            if (!(o != null && o.length)) r = i;
            else {
              const l = [...o],
                s = [...i];
              for (; s.length && l.length; ) {
                const u = l.shift(),
                  a = s.findIndex((d) => d.id === u);
                a > -1 && r.push(s.splice(a, 1)[0]);
              }
              r = [...r, ...s];
            }
            return Ze(r, t, n);
          },
          C(e.options, 'debugTable')
        ));
    }
  },
  N = () => ({ left: [], right: [] }),
  et = {
    getInitialState: (e) => ({ columnPinning: N(), ...e }),
    getDefaultOptions: (e) => ({
      onColumnPinningChange: x('columnPinning', e)
    }),
    createColumn: (e, o) => {
      (e.pin = (t) => {
        const n = e
          .getLeafColumns()
          .map((i) => i.id)
          .filter(Boolean);
        o.setColumnPinning((i) => {
          var r, l;
          if (t === 'right') {
            var s, u;
            return {
              left: ((s = i == null ? void 0 : i.left) != null ? s : []).filter(
                (f) => !(n != null && n.includes(f))
              ),
              right: [
                ...((u = i == null ? void 0 : i.right) != null ? u : []).filter(
                  (f) => !(n != null && n.includes(f))
                ),
                ...n
              ]
            };
          }
          if (t === 'left') {
            var a, d;
            return {
              left: [
                ...((a = i == null ? void 0 : i.left) != null ? a : []).filter(
                  (f) => !(n != null && n.includes(f))
                ),
                ...n
              ],
              right: ((d = i == null ? void 0 : i.right) != null
                ? d
                : []
              ).filter((f) => !(n != null && n.includes(f)))
            };
          }
          return {
            left: ((r = i == null ? void 0 : i.left) != null ? r : []).filter(
              (f) => !(n != null && n.includes(f))
            ),
            right: ((l = i == null ? void 0 : i.right) != null ? l : []).filter(
              (f) => !(n != null && n.includes(f))
            )
          };
        });
      }),
        (e.getCanPin = () =>
          e.getLeafColumns().some((n) => {
            var i, r, l;
            return (
              ((i = n.columnDef.enablePinning) != null ? i : !0) &&
              ((r =
                (l = o.options.enableColumnPinning) != null
                  ? l
                  : o.options.enablePinning) != null
                ? r
                : !0)
            );
          })),
        (e.getIsPinned = () => {
          const t = e.getLeafColumns().map((s) => s.id),
            { left: n, right: i } = o.getState().columnPinning,
            r = t.some((s) => (n == null ? void 0 : n.includes(s))),
            l = t.some((s) => (i == null ? void 0 : i.includes(s)));
          return r ? 'left' : l ? 'right' : !1;
        }),
        (e.getPinnedIndex = () => {
          var t, n;
          const i = e.getIsPinned();
          return i
            ? (t =
                (n = o.getState().columnPinning) == null || (n = n[i]) == null
                  ? void 0
                  : n.indexOf(e.id)) != null
              ? t
              : -1
            : 0;
        });
    },
    createRow: (e, o) => {
      (e.getCenterVisibleCells = m(
        () => [
          e._getAllVisibleCells(),
          o.getState().columnPinning.left,
          o.getState().columnPinning.right
        ],
        (t, n, i) => {
          const r = [...(n ?? []), ...(i ?? [])];
          return t.filter((l) => !r.includes(l.column.id));
        },
        C(o.options, 'debugRows')
      )),
        (e.getLeftVisibleCells = m(
          () => [e._getAllVisibleCells(), o.getState().columnPinning.left],
          (t, n) =>
            (n ?? [])
              .map((r) => t.find((l) => l.column.id === r))
              .filter(Boolean)
              .map((r) => ({ ...r, position: 'left' })),
          C(o.options, 'debugRows')
        )),
        (e.getRightVisibleCells = m(
          () => [e._getAllVisibleCells(), o.getState().columnPinning.right],
          (t, n) =>
            (n ?? [])
              .map((r) => t.find((l) => l.column.id === r))
              .filter(Boolean)
              .map((r) => ({ ...r, position: 'right' })),
          C(o.options, 'debugRows')
        ));
    },
    createTable: (e) => {
      (e.setColumnPinning = (o) =>
        e.options.onColumnPinningChange == null
          ? void 0
          : e.options.onColumnPinningChange(o)),
        (e.resetColumnPinning = (o) => {
          var t, n;
          return e.setColumnPinning(
            o
              ? N()
              : (t = (n = e.initialState) == null ? void 0 : n.columnPinning) !=
                null
              ? t
              : N()
          );
        }),
        (e.getIsSomeColumnsPinned = (o) => {
          var t;
          const n = e.getState().columnPinning;
          if (!o) {
            var i, r;
            return !!(
              ((i = n.left) != null && i.length) ||
              ((r = n.right) != null && r.length)
            );
          }
          return !!((t = n[o]) != null && t.length);
        }),
        (e.getLeftLeafColumns = m(
          () => [e.getAllLeafColumns(), e.getState().columnPinning.left],
          (o, t) =>
            (t ?? []).map((n) => o.find((i) => i.id === n)).filter(Boolean),
          C(e.options, 'debugColumns')
        )),
        (e.getRightLeafColumns = m(
          () => [e.getAllLeafColumns(), e.getState().columnPinning.right],
          (o, t) =>
            (t ?? []).map((n) => o.find((i) => i.id === n)).filter(Boolean),
          C(e.options, 'debugColumns')
        )),
        (e.getCenterLeafColumns = m(
          () => [
            e.getAllLeafColumns(),
            e.getState().columnPinning.left,
            e.getState().columnPinning.right
          ],
          (o, t, n) => {
            const i = [...(t ?? []), ...(n ?? [])];
            return o.filter((r) => !i.includes(r.id));
          },
          C(e.options, 'debugColumns')
        ));
    }
  },
  z = { size: 150, minSize: 20, maxSize: Number.MAX_SAFE_INTEGER },
  k = () => ({
    startOffset: null,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: !1,
    columnSizingStart: []
  }),
  tt = {
    getDefaultColumnDef: () => z,
    getInitialState: (e) => ({ columnSizing: {}, columnSizingInfo: k(), ...e }),
    getDefaultOptions: (e) => ({
      columnResizeMode: 'onEnd',
      columnResizeDirection: 'ltr',
      onColumnSizingChange: x('columnSizing', e),
      onColumnSizingInfoChange: x('columnSizingInfo', e)
    }),
    createColumn: (e, o) => {
      (e.getSize = () => {
        var t, n, i;
        const r = o.getState().columnSizing[e.id];
        return Math.min(
          Math.max(
            (t = e.columnDef.minSize) != null ? t : z.minSize,
            (n = r ?? e.columnDef.size) != null ? n : z.size
          ),
          (i = e.columnDef.maxSize) != null ? i : z.maxSize
        );
      }),
        (e.getStart = m(
          (t) => [t, A(o, t), o.getState().columnSizing],
          (t, n) =>
            n.slice(0, e.getIndex(t)).reduce((i, r) => i + r.getSize(), 0),
          C(o.options, 'debugColumns')
        )),
        (e.getAfter = m(
          (t) => [t, A(o, t), o.getState().columnSizing],
          (t, n) =>
            n.slice(e.getIndex(t) + 1).reduce((i, r) => i + r.getSize(), 0),
          C(o.options, 'debugColumns')
        )),
        (e.resetSize = () => {
          o.setColumnSizing((t) => {
            let { [e.id]: n, ...i } = t;
            return i;
          });
        }),
        (e.getCanResize = () => {
          var t, n;
          return (
            ((t = e.columnDef.enableResizing) != null ? t : !0) &&
            ((n = o.options.enableColumnResizing) != null ? n : !0)
          );
        }),
        (e.getIsResizing = () =>
          o.getState().columnSizingInfo.isResizingColumn === e.id);
    },
    createHeader: (e, o) => {
      (e.getSize = () => {
        let t = 0;
        const n = (i) => {
          if (i.subHeaders.length) i.subHeaders.forEach(n);
          else {
            var r;
            t += (r = i.column.getSize()) != null ? r : 0;
          }
        };
        return n(e), t;
      }),
        (e.getStart = () => {
          if (e.index > 0) {
            const t = e.headerGroup.headers[e.index - 1];
            return t.getStart() + t.getSize();
          }
          return 0;
        }),
        (e.getResizeHandler = (t) => {
          const n = o.getColumn(e.column.id),
            i = n == null ? void 0 : n.getCanResize();
          return (r) => {
            if (
              !n ||
              !i ||
              (r.persist == null || r.persist(),
              q(r) && r.touches && r.touches.length > 1)
            )
              return;
            const l = e.getSize(),
              s = e
                ? e
                    .getLeafHeaders()
                    .map((R) => [R.column.id, R.column.getSize()])
                : [[n.id, n.getSize()]],
              u = q(r) ? Math.round(r.touches[0].clientX) : r.clientX,
              a = {},
              d = (R, h) => {
                typeof h == 'number' &&
                  (o.setColumnSizingInfo((_) => {
                    var M, $;
                    const D =
                        o.options.columnResizeDirection === 'rtl' ? -1 : 1,
                      ne =
                        (h -
                          ((M = _ == null ? void 0 : _.startOffset) != null
                            ? M
                            : 0)) *
                        D,
                      oe = Math.max(
                        ne /
                          (($ = _ == null ? void 0 : _.startSize) != null
                            ? $
                            : 0),
                        -0.999999
                      );
                    return (
                      _.columnSizingStart.forEach((Re) => {
                        let [we, ie] = Re;
                        a[we] =
                          Math.round(Math.max(ie + ie * oe, 0) * 100) / 100;
                      }),
                      { ..._, deltaOffset: ne, deltaPercentage: oe }
                    );
                  }),
                  (o.options.columnResizeMode === 'onChange' || R === 'end') &&
                    o.setColumnSizing((_) => ({ ..._, ...a })));
              },
              f = (R) => d('move', R),
              c = (R) => {
                d('end', R),
                  o.setColumnSizingInfo((h) => ({
                    ...h,
                    isResizingColumn: !1,
                    startOffset: null,
                    startSize: null,
                    deltaOffset: null,
                    deltaPercentage: null,
                    columnSizingStart: []
                  }));
              },
              g = t || typeof document < 'u' ? document : null,
              p = {
                moveHandler: (R) => f(R.clientX),
                upHandler: (R) => {
                  g == null ||
                    g.removeEventListener('mousemove', p.moveHandler),
                    g == null || g.removeEventListener('mouseup', p.upHandler),
                    c(R.clientX);
                }
              },
              S = {
                moveHandler: (R) => (
                  R.cancelable && (R.preventDefault(), R.stopPropagation()),
                  f(R.touches[0].clientX),
                  !1
                ),
                upHandler: (R) => {
                  var h;
                  g == null ||
                    g.removeEventListener('touchmove', S.moveHandler),
                    g == null || g.removeEventListener('touchend', S.upHandler),
                    R.cancelable && (R.preventDefault(), R.stopPropagation()),
                    c((h = R.touches[0]) == null ? void 0 : h.clientX);
                }
              },
              w = nt() ? { passive: !1 } : !1;
            q(r)
              ? (g == null || g.addEventListener('touchmove', S.moveHandler, w),
                g == null || g.addEventListener('touchend', S.upHandler, w))
              : (g == null || g.addEventListener('mousemove', p.moveHandler, w),
                g == null || g.addEventListener('mouseup', p.upHandler, w)),
              o.setColumnSizingInfo((R) => ({
                ...R,
                startOffset: u,
                startSize: l,
                deltaOffset: 0,
                deltaPercentage: 0,
                columnSizingStart: s,
                isResizingColumn: n.id
              }));
          };
        });
    },
    createTable: (e) => {
      (e.setColumnSizing = (o) =>
        e.options.onColumnSizingChange == null
          ? void 0
          : e.options.onColumnSizingChange(o)),
        (e.setColumnSizingInfo = (o) =>
          e.options.onColumnSizingInfoChange == null
            ? void 0
            : e.options.onColumnSizingInfoChange(o)),
        (e.resetColumnSizing = (o) => {
          var t;
          e.setColumnSizing(
            o ? {} : (t = e.initialState.columnSizing) != null ? t : {}
          );
        }),
        (e.resetHeaderSizeInfo = (o) => {
          var t;
          e.setColumnSizingInfo(
            o ? k() : (t = e.initialState.columnSizingInfo) != null ? t : k()
          );
        }),
        (e.getTotalSize = () => {
          var o, t;
          return (o =
            (t = e.getHeaderGroups()[0]) == null
              ? void 0
              : t.headers.reduce((n, i) => n + i.getSize(), 0)) != null
            ? o
            : 0;
        }),
        (e.getLeftTotalSize = () => {
          var o, t;
          return (o =
            (t = e.getLeftHeaderGroups()[0]) == null
              ? void 0
              : t.headers.reduce((n, i) => n + i.getSize(), 0)) != null
            ? o
            : 0;
        }),
        (e.getCenterTotalSize = () => {
          var o, t;
          return (o =
            (t = e.getCenterHeaderGroups()[0]) == null
              ? void 0
              : t.headers.reduce((n, i) => n + i.getSize(), 0)) != null
            ? o
            : 0;
        }),
        (e.getRightTotalSize = () => {
          var o, t;
          return (o =
            (t = e.getRightHeaderGroups()[0]) == null
              ? void 0
              : t.headers.reduce((n, i) => n + i.getSize(), 0)) != null
            ? o
            : 0;
        });
    }
  };
let L = null;
function nt() {
  if (typeof L == 'boolean') return L;
  let e = !1;
  try {
    const o = {
        get passive() {
          return (e = !0), !1;
        }
      },
      t = () => {};
    window.addEventListener('test', t, o),
      window.removeEventListener('test', t);
  } catch {
    e = !1;
  }
  return (L = e), L;
}
function q(e) {
  return e.type === 'touchstart';
}
const ot = {
  getInitialState: (e) => ({ columnVisibility: {}, ...e }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: x('columnVisibility', e)
  }),
  createColumn: (e, o) => {
    (e.toggleVisibility = (t) => {
      e.getCanHide() &&
        o.setColumnVisibility((n) => ({
          ...n,
          [e.id]: t ?? !e.getIsVisible()
        }));
    }),
      (e.getIsVisible = () => {
        var t, n;
        const i = e.columns;
        return (t = i.length
          ? i.some((r) => r.getIsVisible())
          : (n = o.getState().columnVisibility) == null
          ? void 0
          : n[e.id]) != null
          ? t
          : !0;
      }),
      (e.getCanHide = () => {
        var t, n;
        return (
          ((t = e.columnDef.enableHiding) != null ? t : !0) &&
          ((n = o.options.enableHiding) != null ? n : !0)
        );
      }),
      (e.getToggleVisibilityHandler = () => (t) => {
        e.toggleVisibility == null || e.toggleVisibility(t.target.checked);
      });
  },
  createRow: (e, o) => {
    (e._getAllVisibleCells = m(
      () => [e.getAllCells(), o.getState().columnVisibility],
      (t) => t.filter((n) => n.column.getIsVisible()),
      C(o.options, 'debugRows')
    )),
      (e.getVisibleCells = m(
        () => [
          e.getLeftVisibleCells(),
          e.getCenterVisibleCells(),
          e.getRightVisibleCells()
        ],
        (t, n, i) => [...t, ...n, ...i],
        C(o.options, 'debugRows')
      ));
  },
  createTable: (e) => {
    const o = (t, n) =>
      m(
        () => [
          n(),
          n()
            .filter((i) => i.getIsVisible())
            .map((i) => i.id)
            .join('_')
        ],
        (i) =>
          i.filter((r) => (r.getIsVisible == null ? void 0 : r.getIsVisible())),
        C(e.options, 'debugColumns')
      );
    (e.getVisibleFlatColumns = o('getVisibleFlatColumns', () =>
      e.getAllFlatColumns()
    )),
      (e.getVisibleLeafColumns = o('getVisibleLeafColumns', () =>
        e.getAllLeafColumns()
      )),
      (e.getLeftVisibleLeafColumns = o('getLeftVisibleLeafColumns', () =>
        e.getLeftLeafColumns()
      )),
      (e.getRightVisibleLeafColumns = o('getRightVisibleLeafColumns', () =>
        e.getRightLeafColumns()
      )),
      (e.getCenterVisibleLeafColumns = o('getCenterVisibleLeafColumns', () =>
        e.getCenterLeafColumns()
      )),
      (e.setColumnVisibility = (t) =>
        e.options.onColumnVisibilityChange == null
          ? void 0
          : e.options.onColumnVisibilityChange(t)),
      (e.resetColumnVisibility = (t) => {
        var n;
        e.setColumnVisibility(
          t ? {} : (n = e.initialState.columnVisibility) != null ? n : {}
        );
      }),
      (e.toggleAllColumnsVisible = (t) => {
        var n;
        (t = (n = t) != null ? n : !e.getIsAllColumnsVisible()),
          e.setColumnVisibility(
            e
              .getAllLeafColumns()
              .reduce(
                (i, r) => ({
                  ...i,
                  [r.id]: t || !(r.getCanHide != null && r.getCanHide())
                }),
                {}
              )
          );
      }),
      (e.getIsAllColumnsVisible = () =>
        !e
          .getAllLeafColumns()
          .some((t) => !(t.getIsVisible != null && t.getIsVisible()))),
      (e.getIsSomeColumnsVisible = () =>
        e
          .getAllLeafColumns()
          .some((t) => (t.getIsVisible == null ? void 0 : t.getIsVisible()))),
      (e.getToggleAllColumnsVisibilityHandler = () => (t) => {
        var n;
        e.toggleAllColumnsVisible((n = t.target) == null ? void 0 : n.checked);
      });
  }
};
function A(e, o) {
  return o
    ? o === 'center'
      ? e.getCenterVisibleLeafColumns()
      : o === 'left'
      ? e.getLeftVisibleLeafColumns()
      : e.getRightVisibleLeafColumns()
    : e.getVisibleLeafColumns();
}
const it = {
    createTable: (e) => {
      (e._getGlobalFacetedRowModel =
        e.options.getFacetedRowModel &&
        e.options.getFacetedRowModel(e, '__global__')),
        (e.getGlobalFacetedRowModel = () =>
          e.options.manualFiltering || !e._getGlobalFacetedRowModel
            ? e.getPreFilteredRowModel()
            : e._getGlobalFacetedRowModel()),
        (e._getGlobalFacetedUniqueValues =
          e.options.getFacetedUniqueValues &&
          e.options.getFacetedUniqueValues(e, '__global__')),
        (e.getGlobalFacetedUniqueValues = () =>
          e._getGlobalFacetedUniqueValues
            ? e._getGlobalFacetedUniqueValues()
            : new Map()),
        (e._getGlobalFacetedMinMaxValues =
          e.options.getFacetedMinMaxValues &&
          e.options.getFacetedMinMaxValues(e, '__global__')),
        (e.getGlobalFacetedMinMaxValues = () => {
          if (e._getGlobalFacetedMinMaxValues)
            return e._getGlobalFacetedMinMaxValues();
        });
    }
  },
  rt = {
    getInitialState: (e) => ({ globalFilter: void 0, ...e }),
    getDefaultOptions: (e) => ({
      onGlobalFilterChange: x('globalFilter', e),
      globalFilterFn: 'auto',
      getColumnCanGlobalFilter: (o) => {
        var t;
        const n =
          (t = e.getCoreRowModel().flatRows[0]) == null ||
          (t = t._getAllCellsByColumnId()[o.id]) == null
            ? void 0
            : t.getValue();
        return typeof n == 'string' || typeof n == 'number';
      }
    }),
    createColumn: (e, o) => {
      e.getCanGlobalFilter = () => {
        var t, n, i, r;
        return (
          ((t = e.columnDef.enableGlobalFilter) != null ? t : !0) &&
          ((n = o.options.enableGlobalFilter) != null ? n : !0) &&
          ((i = o.options.enableFilters) != null ? i : !0) &&
          ((r =
            o.options.getColumnCanGlobalFilter == null
              ? void 0
              : o.options.getColumnCanGlobalFilter(e)) != null
            ? r
            : !0) &&
          !!e.accessorFn
        );
      };
    },
    createTable: (e) => {
      (e.getGlobalAutoFilterFn = () => V.includesString),
        (e.getGlobalFilterFn = () => {
          var o, t;
          const { globalFilterFn: n } = e.options;
          return O(n)
            ? n
            : n === 'auto'
            ? e.getGlobalAutoFilterFn()
            : (o = (t = e.options.filterFns) == null ? void 0 : t[n]) != null
            ? o
            : V[n];
        }),
        (e.setGlobalFilter = (o) => {
          e.options.onGlobalFilterChange == null ||
            e.options.onGlobalFilterChange(o);
        }),
        (e.resetGlobalFilter = (o) => {
          e.setGlobalFilter(o ? void 0 : e.initialState.globalFilter);
        });
    }
  },
  lt = {
    getInitialState: (e) => ({ expanded: {}, ...e }),
    getDefaultOptions: (e) => ({
      onExpandedChange: x('expanded', e),
      paginateExpandedRows: !0
    }),
    createTable: (e) => {
      let o = !1,
        t = !1;
      (e._autoResetExpanded = () => {
        var n, i;
        if (!o) {
          e._queue(() => {
            o = !0;
          });
          return;
        }
        if (
          (n =
            (i = e.options.autoResetAll) != null
              ? i
              : e.options.autoResetExpanded) != null
            ? n
            : !e.options.manualExpanding
        ) {
          if (t) return;
          (t = !0),
            e._queue(() => {
              e.resetExpanded(), (t = !1);
            });
        }
      }),
        (e.setExpanded = (n) =>
          e.options.onExpandedChange == null
            ? void 0
            : e.options.onExpandedChange(n)),
        (e.toggleAllRowsExpanded = (n) => {
          n ?? !e.getIsAllRowsExpanded()
            ? e.setExpanded(!0)
            : e.setExpanded({});
        }),
        (e.resetExpanded = (n) => {
          var i, r;
          e.setExpanded(
            n
              ? {}
              : (i = (r = e.initialState) == null ? void 0 : r.expanded) != null
              ? i
              : {}
          );
        }),
        (e.getCanSomeRowsExpand = () =>
          e.getPrePaginationRowModel().flatRows.some((n) => n.getCanExpand())),
        (e.getToggleAllRowsExpandedHandler = () => (n) => {
          n.persist == null || n.persist(), e.toggleAllRowsExpanded();
        }),
        (e.getIsSomeRowsExpanded = () => {
          const n = e.getState().expanded;
          return n === !0 || Object.values(n).some(Boolean);
        }),
        (e.getIsAllRowsExpanded = () => {
          const n = e.getState().expanded;
          return typeof n == 'boolean'
            ? n === !0
            : !(
                !Object.keys(n).length ||
                e.getRowModel().flatRows.some((i) => !i.getIsExpanded())
              );
        }),
        (e.getExpandedDepth = () => {
          let n = 0;
          return (
            (e.getState().expanded === !0
              ? Object.keys(e.getRowModel().rowsById)
              : Object.keys(e.getState().expanded)
            ).forEach((r) => {
              const l = r.split('.');
              n = Math.max(n, l.length);
            }),
            n
          );
        }),
        (e.getPreExpandedRowModel = () => e.getSortedRowModel()),
        (e.getExpandedRowModel = () => (
          !e._getExpandedRowModel &&
            e.options.getExpandedRowModel &&
            (e._getExpandedRowModel = e.options.getExpandedRowModel(e)),
          e.options.manualExpanding || !e._getExpandedRowModel
            ? e.getPreExpandedRowModel()
            : e._getExpandedRowModel()
        ));
    },
    createRow: (e, o) => {
      (e.toggleExpanded = (t) => {
        o.setExpanded((n) => {
          var i;
          const r = n === !0 ? !0 : !!(n != null && n[e.id]);
          let l = {};
          if (
            (n === !0
              ? Object.keys(o.getRowModel().rowsById).forEach((s) => {
                  l[s] = !0;
                })
              : (l = n),
            (t = (i = t) != null ? i : !r),
            !r && t)
          )
            return { ...l, [e.id]: !0 };
          if (r && !t) {
            const { [e.id]: s, ...u } = l;
            return u;
          }
          return n;
        });
      }),
        (e.getIsExpanded = () => {
          var t;
          const n = o.getState().expanded;
          return !!((t =
            o.options.getIsRowExpanded == null
              ? void 0
              : o.options.getIsRowExpanded(e)) != null
            ? t
            : n === !0 || (n != null && n[e.id]));
        }),
        (e.getCanExpand = () => {
          var t, n, i;
          return (t =
            o.options.getRowCanExpand == null
              ? void 0
              : o.options.getRowCanExpand(e)) != null
            ? t
            : ((n = o.options.enableExpanding) != null ? n : !0) &&
                !!((i = e.subRows) != null && i.length);
        }),
        (e.getIsAllParentsExpanded = () => {
          let t = !0,
            n = e;
          for (; t && n.parentId; )
            (n = o.getRow(n.parentId, !0)), (t = n.getIsExpanded());
          return t;
        }),
        (e.getToggleExpandedHandler = () => {
          const t = e.getCanExpand();
          return () => {
            t && e.toggleExpanded();
          };
        });
    }
  },
  J = 0,
  Q = 10,
  U = () => ({ pageIndex: J, pageSize: Q }),
  st = {
    getInitialState: (e) => ({
      ...e,
      pagination: { ...U(), ...(e == null ? void 0 : e.pagination) }
    }),
    getDefaultOptions: (e) => ({ onPaginationChange: x('pagination', e) }),
    createTable: (e) => {
      let o = !1,
        t = !1;
      (e._autoResetPageIndex = () => {
        var n, i;
        if (!o) {
          e._queue(() => {
            o = !0;
          });
          return;
        }
        if (
          (n =
            (i = e.options.autoResetAll) != null
              ? i
              : e.options.autoResetPageIndex) != null
            ? n
            : !e.options.manualPagination
        ) {
          if (t) return;
          (t = !0),
            e._queue(() => {
              e.resetPageIndex(), (t = !1);
            });
        }
      }),
        (e.setPagination = (n) => {
          const i = (r) => I(n, r);
          return e.options.onPaginationChange == null
            ? void 0
            : e.options.onPaginationChange(i);
        }),
        (e.resetPagination = (n) => {
          var i;
          e.setPagination(
            n ? U() : (i = e.initialState.pagination) != null ? i : U()
          );
        }),
        (e.setPageIndex = (n) => {
          e.setPagination((i) => {
            let r = I(n, i.pageIndex);
            const l =
              typeof e.options.pageCount > 'u' || e.options.pageCount === -1
                ? Number.MAX_SAFE_INTEGER
                : e.options.pageCount - 1;
            return (r = Math.max(0, Math.min(r, l))), { ...i, pageIndex: r };
          });
        }),
        (e.resetPageIndex = (n) => {
          var i, r;
          e.setPageIndex(
            n
              ? J
              : (i =
                  (r = e.initialState) == null || (r = r.pagination) == null
                    ? void 0
                    : r.pageIndex) != null
              ? i
              : J
          );
        }),
        (e.resetPageSize = (n) => {
          var i, r;
          e.setPageSize(
            n
              ? Q
              : (i =
                  (r = e.initialState) == null || (r = r.pagination) == null
                    ? void 0
                    : r.pageSize) != null
              ? i
              : Q
          );
        }),
        (e.setPageSize = (n) => {
          e.setPagination((i) => {
            const r = Math.max(1, I(n, i.pageSize)),
              l = i.pageSize * i.pageIndex,
              s = Math.floor(l / r);
            return { ...i, pageIndex: s, pageSize: r };
          });
        }),
        (e.setPageCount = (n) =>
          e.setPagination((i) => {
            var r;
            let l = I(n, (r = e.options.pageCount) != null ? r : -1);
            return (
              typeof l == 'number' && (l = Math.max(-1, l)),
              { ...i, pageCount: l }
            );
          })),
        (e.getPageOptions = m(
          () => [e.getPageCount()],
          (n) => {
            let i = [];
            return (
              n && n > 0 && (i = [...new Array(n)].fill(null).map((r, l) => l)),
              i
            );
          },
          C(e.options, 'debugTable')
        )),
        (e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0),
        (e.getCanNextPage = () => {
          const { pageIndex: n } = e.getState().pagination,
            i = e.getPageCount();
          return i === -1 ? !0 : i === 0 ? !1 : n < i - 1;
        }),
        (e.previousPage = () => e.setPageIndex((n) => n - 1)),
        (e.nextPage = () => e.setPageIndex((n) => n + 1)),
        (e.firstPage = () => e.setPageIndex(0)),
        (e.lastPage = () => e.setPageIndex(e.getPageCount() - 1)),
        (e.getPrePaginationRowModel = () => e.getExpandedRowModel()),
        (e.getPaginationRowModel = () => (
          !e._getPaginationRowModel &&
            e.options.getPaginationRowModel &&
            (e._getPaginationRowModel = e.options.getPaginationRowModel(e)),
          e.options.manualPagination || !e._getPaginationRowModel
            ? e.getPrePaginationRowModel()
            : e._getPaginationRowModel()
        )),
        (e.getPageCount = () => {
          var n;
          return (n = e.options.pageCount) != null
            ? n
            : Math.ceil(e.getRowCount() / e.getState().pagination.pageSize);
        }),
        (e.getRowCount = () => {
          var n;
          return (n = e.options.rowCount) != null
            ? n
            : e.getPrePaginationRowModel().rows.length;
        });
    }
  },
  X = () => ({ top: [], bottom: [] }),
  ut = {
    getInitialState: (e) => ({ rowPinning: X(), ...e }),
    getDefaultOptions: (e) => ({ onRowPinningChange: x('rowPinning', e) }),
    createRow: (e, o) => {
      (e.pin = (t, n, i) => {
        const r = n
            ? e.getLeafRows().map((u) => {
                let { id: a } = u;
                return a;
              })
            : [],
          l = i
            ? e.getParentRows().map((u) => {
                let { id: a } = u;
                return a;
              })
            : [],
          s = new Set([...l, e.id, ...r]);
        o.setRowPinning((u) => {
          var a, d;
          if (t === 'bottom') {
            var f, c;
            return {
              top: ((f = u == null ? void 0 : u.top) != null ? f : []).filter(
                (S) => !(s != null && s.has(S))
              ),
              bottom: [
                ...((c = u == null ? void 0 : u.bottom) != null
                  ? c
                  : []
                ).filter((S) => !(s != null && s.has(S))),
                ...Array.from(s)
              ]
            };
          }
          if (t === 'top') {
            var g, p;
            return {
              top: [
                ...((g = u == null ? void 0 : u.top) != null ? g : []).filter(
                  (S) => !(s != null && s.has(S))
                ),
                ...Array.from(s)
              ],
              bottom: ((p = u == null ? void 0 : u.bottom) != null
                ? p
                : []
              ).filter((S) => !(s != null && s.has(S)))
            };
          }
          return {
            top: ((a = u == null ? void 0 : u.top) != null ? a : []).filter(
              (S) => !(s != null && s.has(S))
            ),
            bottom: ((d = u == null ? void 0 : u.bottom) != null
              ? d
              : []
            ).filter((S) => !(s != null && s.has(S)))
          };
        });
      }),
        (e.getCanPin = () => {
          var t;
          const { enableRowPinning: n, enablePinning: i } = o.options;
          return typeof n == 'function' ? n(e) : (t = n ?? i) != null ? t : !0;
        }),
        (e.getIsPinned = () => {
          const t = [e.id],
            { top: n, bottom: i } = o.getState().rowPinning,
            r = t.some((s) => (n == null ? void 0 : n.includes(s))),
            l = t.some((s) => (i == null ? void 0 : i.includes(s)));
          return r ? 'top' : l ? 'bottom' : !1;
        }),
        (e.getPinnedIndex = () => {
          var t, n;
          const i = e.getIsPinned();
          if (!i) return -1;
          const r =
            (t = i === 'top' ? o.getTopRows() : o.getBottomRows()) == null
              ? void 0
              : t.map((l) => {
                  let { id: s } = l;
                  return s;
                });
          return (n = r == null ? void 0 : r.indexOf(e.id)) != null ? n : -1;
        });
    },
    createTable: (e) => {
      (e.setRowPinning = (o) =>
        e.options.onRowPinningChange == null
          ? void 0
          : e.options.onRowPinningChange(o)),
        (e.resetRowPinning = (o) => {
          var t, n;
          return e.setRowPinning(
            o
              ? X()
              : (t = (n = e.initialState) == null ? void 0 : n.rowPinning) !=
                null
              ? t
              : X()
          );
        }),
        (e.getIsSomeRowsPinned = (o) => {
          var t;
          const n = e.getState().rowPinning;
          if (!o) {
            var i, r;
            return !!(
              ((i = n.top) != null && i.length) ||
              ((r = n.bottom) != null && r.length)
            );
          }
          return !!((t = n[o]) != null && t.length);
        }),
        (e._getPinnedRows = (o, t, n) => {
          var i;
          return (
            (i = e.options.keepPinnedRows) == null || i
              ? (t ?? []).map((l) => {
                  const s = e.getRow(l, !0);
                  return s.getIsAllParentsExpanded() ? s : null;
                })
              : (t ?? []).map((l) => o.find((s) => s.id === l))
          )
            .filter(Boolean)
            .map((l) => ({ ...l, position: n }));
        }),
        (e.getTopRows = m(
          () => [e.getRowModel().rows, e.getState().rowPinning.top],
          (o, t) => e._getPinnedRows(o, t, 'top'),
          C(e.options, 'debugRows')
        )),
        (e.getBottomRows = m(
          () => [e.getRowModel().rows, e.getState().rowPinning.bottom],
          (o, t) => e._getPinnedRows(o, t, 'bottom'),
          C(e.options, 'debugRows')
        )),
        (e.getCenterRows = m(
          () => [
            e.getRowModel().rows,
            e.getState().rowPinning.top,
            e.getState().rowPinning.bottom
          ],
          (o, t, n) => {
            const i = new Set([...(t ?? []), ...(n ?? [])]);
            return o.filter((r) => !i.has(r.id));
          },
          C(e.options, 'debugRows')
        ));
    }
  },
  at = {
    getInitialState: (e) => ({ rowSelection: {}, ...e }),
    getDefaultOptions: (e) => ({
      onRowSelectionChange: x('rowSelection', e),
      enableRowSelection: !0,
      enableMultiRowSelection: !0,
      enableSubRowSelection: !0
    }),
    createTable: (e) => {
      (e.setRowSelection = (o) =>
        e.options.onRowSelectionChange == null
          ? void 0
          : e.options.onRowSelectionChange(o)),
        (e.resetRowSelection = (o) => {
          var t;
          return e.setRowSelection(
            o ? {} : (t = e.initialState.rowSelection) != null ? t : {}
          );
        }),
        (e.toggleAllRowsSelected = (o) => {
          e.setRowSelection((t) => {
            o = typeof o < 'u' ? o : !e.getIsAllRowsSelected();
            const n = { ...t },
              i = e.getPreGroupedRowModel().flatRows;
            return (
              o
                ? i.forEach((r) => {
                    r.getCanSelect() && (n[r.id] = !0);
                  })
                : i.forEach((r) => {
                    delete n[r.id];
                  }),
              n
            );
          });
        }),
        (e.toggleAllPageRowsSelected = (o) =>
          e.setRowSelection((t) => {
            const n = typeof o < 'u' ? o : !e.getIsAllPageRowsSelected(),
              i = { ...t };
            return (
              e.getRowModel().rows.forEach((r) => {
                W(i, r.id, n, !0, e);
              }),
              i
            );
          })),
        (e.getPreSelectedRowModel = () => e.getCoreRowModel()),
        (e.getSelectedRowModel = m(
          () => [e.getState().rowSelection, e.getCoreRowModel()],
          (o, t) =>
            Object.keys(o).length
              ? K(e, t)
              : { rows: [], flatRows: [], rowsById: {} },
          C(e.options, 'debugTable')
        )),
        (e.getFilteredSelectedRowModel = m(
          () => [e.getState().rowSelection, e.getFilteredRowModel()],
          (o, t) =>
            Object.keys(o).length
              ? K(e, t)
              : { rows: [], flatRows: [], rowsById: {} },
          C(e.options, 'debugTable')
        )),
        (e.getGroupedSelectedRowModel = m(
          () => [e.getState().rowSelection, e.getSortedRowModel()],
          (o, t) =>
            Object.keys(o).length
              ? K(e, t)
              : { rows: [], flatRows: [], rowsById: {} },
          C(e.options, 'debugTable')
        )),
        (e.getIsAllRowsSelected = () => {
          const o = e.getFilteredRowModel().flatRows,
            { rowSelection: t } = e.getState();
          let n = !!(o.length && Object.keys(t).length);
          return (
            n && o.some((i) => i.getCanSelect() && !t[i.id]) && (n = !1), n
          );
        }),
        (e.getIsAllPageRowsSelected = () => {
          const o = e
              .getPaginationRowModel()
              .flatRows.filter((i) => i.getCanSelect()),
            { rowSelection: t } = e.getState();
          let n = !!o.length;
          return n && o.some((i) => !t[i.id]) && (n = !1), n;
        }),
        (e.getIsSomeRowsSelected = () => {
          var o;
          const t = Object.keys(
            (o = e.getState().rowSelection) != null ? o : {}
          ).length;
          return t > 0 && t < e.getFilteredRowModel().flatRows.length;
        }),
        (e.getIsSomePageRowsSelected = () => {
          const o = e.getPaginationRowModel().flatRows;
          return e.getIsAllPageRowsSelected()
            ? !1
            : o
                .filter((t) => t.getCanSelect())
                .some((t) => t.getIsSelected() || t.getIsSomeSelected());
        }),
        (e.getToggleAllRowsSelectedHandler = () => (o) => {
          e.toggleAllRowsSelected(o.target.checked);
        }),
        (e.getToggleAllPageRowsSelectedHandler = () => (o) => {
          e.toggleAllPageRowsSelected(o.target.checked);
        });
    },
    createRow: (e, o) => {
      (e.toggleSelected = (t, n) => {
        const i = e.getIsSelected();
        o.setRowSelection((r) => {
          var l;
          if (((t = typeof t < 'u' ? t : !i), e.getCanSelect() && i === t))
            return r;
          const s = { ...r };
          return (
            W(
              s,
              e.id,
              t,
              (l = n == null ? void 0 : n.selectChildren) != null ? l : !0,
              o
            ),
            s
          );
        });
      }),
        (e.getIsSelected = () => {
          const { rowSelection: t } = o.getState();
          return ee(e, t);
        }),
        (e.getIsSomeSelected = () => {
          const { rowSelection: t } = o.getState();
          return Y(e, t) === 'some';
        }),
        (e.getIsAllSubRowsSelected = () => {
          const { rowSelection: t } = o.getState();
          return Y(e, t) === 'all';
        }),
        (e.getCanSelect = () => {
          var t;
          return typeof o.options.enableRowSelection == 'function'
            ? o.options.enableRowSelection(e)
            : (t = o.options.enableRowSelection) != null
            ? t
            : !0;
        }),
        (e.getCanSelectSubRows = () => {
          var t;
          return typeof o.options.enableSubRowSelection == 'function'
            ? o.options.enableSubRowSelection(e)
            : (t = o.options.enableSubRowSelection) != null
            ? t
            : !0;
        }),
        (e.getCanMultiSelect = () => {
          var t;
          return typeof o.options.enableMultiRowSelection == 'function'
            ? o.options.enableMultiRowSelection(e)
            : (t = o.options.enableMultiRowSelection) != null
            ? t
            : !0;
        }),
        (e.getToggleSelectedHandler = () => {
          const t = e.getCanSelect();
          return (n) => {
            var i;
            t && e.toggleSelected((i = n.target) == null ? void 0 : i.checked);
          };
        });
    }
  },
  W = (e, o, t, n, i) => {
    var r;
    const l = i.getRow(o, !0);
    t
      ? (l.getCanMultiSelect() || Object.keys(e).forEach((s) => delete e[s]),
        l.getCanSelect() && (e[o] = !0))
      : delete e[o],
      n &&
        (r = l.subRows) != null &&
        r.length &&
        l.getCanSelectSubRows() &&
        l.subRows.forEach((s) => W(e, s.id, t, n, i));
  };
function K(e, o) {
  const t = e.getState().rowSelection,
    n = [],
    i = {},
    r = function (l, s) {
      return l
        .map((u) => {
          var a;
          const d = ee(u, t);
          if (
            (d && (n.push(u), (i[u.id] = u)),
            (a = u.subRows) != null &&
              a.length &&
              (u = { ...u, subRows: r(u.subRows) }),
            d)
          )
            return u;
        })
        .filter(Boolean);
    };
  return { rows: r(o.rows), flatRows: n, rowsById: i };
}
function ee(e, o) {
  var t;
  return (t = o[e.id]) != null ? t : !1;
}
function Y(e, o, t) {
  var n;
  if (!((n = e.subRows) != null && n.length)) return !1;
  let i = !0,
    r = !1;
  return (
    e.subRows.forEach((l) => {
      if (
        !(r && !i) &&
        (l.getCanSelect() && (ee(l, o) ? (r = !0) : (i = !1)),
        l.subRows && l.subRows.length)
      ) {
        const s = Y(l, o);
        s === 'all' ? (r = !0) : (s === 'some' && (r = !0), (i = !1));
      }
    }),
    i ? 'all' : r ? 'some' : !1
  );
}
const Z = /([0-9]+)/gm,
  gt = (e, o, t) =>
    Ce(y(e.getValue(t)).toLowerCase(), y(o.getValue(t)).toLowerCase()),
  dt = (e, o, t) => Ce(y(e.getValue(t)), y(o.getValue(t))),
  ct = (e, o, t) =>
    te(y(e.getValue(t)).toLowerCase(), y(o.getValue(t)).toLowerCase()),
  ft = (e, o, t) => te(y(e.getValue(t)), y(o.getValue(t))),
  pt = (e, o, t) => {
    const n = e.getValue(t),
      i = o.getValue(t);
    return n > i ? 1 : n < i ? -1 : 0;
  },
  St = (e, o, t) => te(e.getValue(t), o.getValue(t));
function te(e, o) {
  return e === o ? 0 : e > o ? 1 : -1;
}
function y(e) {
  return typeof e == 'number'
    ? isNaN(e) || e === 1 / 0 || e === -1 / 0
      ? ''
      : String(e)
    : typeof e == 'string'
    ? e
    : '';
}
function Ce(e, o) {
  const t = e.split(Z).filter(Boolean),
    n = o.split(Z).filter(Boolean);
  for (; t.length && n.length; ) {
    const i = t.shift(),
      r = n.shift(),
      l = parseInt(i, 10),
      s = parseInt(r, 10),
      u = [l, s].sort();
    if (isNaN(u[0])) {
      if (i > r) return 1;
      if (r > i) return -1;
      continue;
    }
    if (isNaN(u[1])) return isNaN(l) ? -1 : 1;
    if (l > s) return 1;
    if (s > l) return -1;
  }
  return t.length - n.length;
}
const H = {
    alphanumeric: gt,
    alphanumericCaseSensitive: dt,
    text: ct,
    textCaseSensitive: ft,
    datetime: pt,
    basic: St
  },
  mt = {
    getInitialState: (e) => ({ sorting: [], ...e }),
    getDefaultColumnDef: () => ({ sortingFn: 'auto', sortUndefined: 1 }),
    getDefaultOptions: (e) => ({
      onSortingChange: x('sorting', e),
      isMultiSortEvent: (o) => o.shiftKey
    }),
    createColumn: (e, o) => {
      (e.getAutoSortingFn = () => {
        const t = o.getFilteredRowModel().flatRows.slice(10);
        let n = !1;
        for (const i of t) {
          const r = i == null ? void 0 : i.getValue(e.id);
          if (Object.prototype.toString.call(r) === '[object Date]')
            return H.datetime;
          if (typeof r == 'string' && ((n = !0), r.split(Z).length > 1))
            return H.alphanumeric;
        }
        return n ? H.text : H.basic;
      }),
        (e.getAutoSortDir = () => {
          const t = o.getFilteredRowModel().flatRows[0];
          return typeof (t == null ? void 0 : t.getValue(e.id)) == 'string'
            ? 'asc'
            : 'desc';
        }),
        (e.getSortingFn = () => {
          var t, n;
          if (!e) throw new Error();
          return O(e.columnDef.sortingFn)
            ? e.columnDef.sortingFn
            : e.columnDef.sortingFn === 'auto'
            ? e.getAutoSortingFn()
            : (t =
                (n = o.options.sortingFns) == null
                  ? void 0
                  : n[e.columnDef.sortingFn]) != null
            ? t
            : H[e.columnDef.sortingFn];
        }),
        (e.toggleSorting = (t, n) => {
          const i = e.getNextSortingOrder(),
            r = typeof t < 'u' && t !== null;
          o.setSorting((l) => {
            const s = l == null ? void 0 : l.find((g) => g.id === e.id),
              u = l == null ? void 0 : l.findIndex((g) => g.id === e.id);
            let a = [],
              d,
              f = r ? t : i === 'desc';
            if (
              (l != null && l.length && e.getCanMultiSort() && n
                ? s
                  ? (d = 'toggle')
                  : (d = 'add')
                : l != null && l.length && u !== l.length - 1
                ? (d = 'replace')
                : s
                ? (d = 'toggle')
                : (d = 'replace'),
              d === 'toggle' && (r || i || (d = 'remove')),
              d === 'add')
            ) {
              var c;
              (a = [...l, { id: e.id, desc: f }]),
                a.splice(
                  0,
                  a.length -
                    ((c = o.options.maxMultiSortColCount) != null
                      ? c
                      : Number.MAX_SAFE_INTEGER)
                );
            } else
              d === 'toggle'
                ? (a = l.map((g) => (g.id === e.id ? { ...g, desc: f } : g)))
                : d === 'remove'
                ? (a = l.filter((g) => g.id !== e.id))
                : (a = [{ id: e.id, desc: f }]);
            return a;
          });
        }),
        (e.getFirstSortDir = () => {
          var t, n;
          return (
            (t =
              (n = e.columnDef.sortDescFirst) != null
                ? n
                : o.options.sortDescFirst) != null
              ? t
              : e.getAutoSortDir() === 'desc'
          )
            ? 'desc'
            : 'asc';
        }),
        (e.getNextSortingOrder = (t) => {
          var n, i;
          const r = e.getFirstSortDir(),
            l = e.getIsSorted();
          return l
            ? l !== r &&
              ((n = o.options.enableSortingRemoval) == null || n) &&
              (!(t && (i = o.options.enableMultiRemove) != null) || i)
              ? !1
              : l === 'desc'
              ? 'asc'
              : 'desc'
            : r;
        }),
        (e.getCanSort = () => {
          var t, n;
          return (
            ((t = e.columnDef.enableSorting) != null ? t : !0) &&
            ((n = o.options.enableSorting) != null ? n : !0) &&
            !!e.accessorFn
          );
        }),
        (e.getCanMultiSort = () => {
          var t, n;
          return (t =
            (n = e.columnDef.enableMultiSort) != null
              ? n
              : o.options.enableMultiSort) != null
            ? t
            : !!e.accessorFn;
        }),
        (e.getIsSorted = () => {
          var t;
          const n =
            (t = o.getState().sorting) == null
              ? void 0
              : t.find((i) => i.id === e.id);
          return n ? (n.desc ? 'desc' : 'asc') : !1;
        }),
        (e.getSortIndex = () => {
          var t, n;
          return (t =
            (n = o.getState().sorting) == null
              ? void 0
              : n.findIndex((i) => i.id === e.id)) != null
            ? t
            : -1;
        }),
        (e.clearSorting = () => {
          o.setSorting((t) =>
            t != null && t.length ? t.filter((n) => n.id !== e.id) : []
          );
        }),
        (e.getToggleSortingHandler = () => {
          const t = e.getCanSort();
          return (n) => {
            t &&
              (n.persist == null || n.persist(),
              e.toggleSorting == null ||
                e.toggleSorting(
                  void 0,
                  e.getCanMultiSort()
                    ? o.options.isMultiSortEvent == null
                      ? void 0
                      : o.options.isMultiSortEvent(n)
                    : !1
                ));
          };
        });
    },
    createTable: (e) => {
      (e.setSorting = (o) =>
        e.options.onSortingChange == null
          ? void 0
          : e.options.onSortingChange(o)),
        (e.resetSorting = (o) => {
          var t, n;
          e.setSorting(
            o
              ? []
              : (t = (n = e.initialState) == null ? void 0 : n.sorting) != null
              ? t
              : []
          );
        }),
        (e.getPreSortedRowModel = () => e.getGroupedRowModel()),
        (e.getSortedRowModel = () => (
          !e._getSortedRowModel &&
            e.options.getSortedRowModel &&
            (e._getSortedRowModel = e.options.getSortedRowModel(e)),
          e.options.manualSorting || !e._getSortedRowModel
            ? e.getPreSortedRowModel()
            : e._getSortedRowModel()
        ));
    }
  },
  Ct = [Oe, ot, be, et, Be, Te, it, rt, mt, Ye, lt, st, ut, at, tt];
function Rt(e) {
  var o, t;
  const n = [...Ct, ...((o = e._features) != null ? o : [])];
  let i = { _features: n };
  const r = i._features.reduce(
      (c, g) =>
        Object.assign(
          c,
          g.getDefaultOptions == null ? void 0 : g.getDefaultOptions(i)
        ),
      {}
    ),
    l = (c) =>
      i.options.mergeOptions ? i.options.mergeOptions(r, c) : { ...r, ...c };
  let u = { ...{}, ...((t = e.initialState) != null ? t : {}) };
  i._features.forEach((c) => {
    var g;
    u =
      (g = c.getInitialState == null ? void 0 : c.getInitialState(u)) != null
        ? g
        : u;
  });
  const a = [];
  let d = !1;
  const f = {
    _features: n,
    options: { ...r, ...e },
    initialState: u,
    _queue: (c) => {
      a.push(c),
        d ||
          ((d = !0),
          Promise.resolve()
            .then(() => {
              for (; a.length; ) a.shift()();
              d = !1;
            })
            .catch((g) =>
              setTimeout(() => {
                throw g;
              })
            ));
    },
    reset: () => {
      i.setState(i.initialState);
    },
    setOptions: (c) => {
      const g = I(c, i.options);
      i.options = l(g);
    },
    getState: () => i.options.state,
    setState: (c) => {
      i.options.onStateChange == null || i.options.onStateChange(c);
    },
    _getRowId: (c, g, p) => {
      var S;
      return (S =
        i.options.getRowId == null ? void 0 : i.options.getRowId(c, g, p)) !=
        null
        ? S
        : `${p ? [p.id, g].join('.') : g}`;
    },
    getCoreRowModel: () => (
      i._getCoreRowModel || (i._getCoreRowModel = i.options.getCoreRowModel(i)),
      i._getCoreRowModel()
    ),
    getRowModel: () => i.getPaginationRowModel(),
    getRow: (c, g) => {
      let p = (g ? i.getPrePaginationRowModel() : i.getRowModel()).rowsById[c];
      if (!p && ((p = i.getCoreRowModel().rowsById[c]), !p)) throw new Error();
      return p;
    },
    _getDefaultColumnDef: m(
      () => [i.options.defaultColumn],
      (c) => {
        var g;
        return (
          (c = (g = c) != null ? g : {}),
          {
            header: (p) => {
              const S = p.header.column.columnDef;
              return S.accessorKey ? S.accessorKey : S.accessorFn ? S.id : null;
            },
            cell: (p) => {
              var S, w;
              return (S =
                (w = p.renderValue()) == null || w.toString == null
                  ? void 0
                  : w.toString()) != null
                ? S
                : null;
            },
            ...i._features.reduce(
              (p, S) =>
                Object.assign(
                  p,
                  S.getDefaultColumnDef == null
                    ? void 0
                    : S.getDefaultColumnDef()
                ),
              {}
            ),
            ...c
          }
        );
      },
      C(e, 'debugColumns')
    ),
    _getColumnDefs: () => i.options.columns,
    getAllColumns: m(
      () => [i._getColumnDefs()],
      (c) => {
        const g = function (p, S, w) {
          return (
            w === void 0 && (w = 0),
            p.map((R) => {
              const h = Le(i, R, w, S),
                _ = R;
              return (h.columns = _.columns ? g(_.columns, h, w + 1) : []), h;
            })
          );
        };
        return g(c);
      },
      C(e, 'debugColumns')
    ),
    getAllFlatColumns: m(
      () => [i.getAllColumns()],
      (c) => c.flatMap((g) => g.getFlatColumns()),
      C(e, 'debugColumns')
    ),
    _getAllFlatColumnsById: m(
      () => [i.getAllFlatColumns()],
      (c) => c.reduce((g, p) => ((g[p.id] = p), g), {}),
      C(e, 'debugColumns')
    ),
    getAllLeafColumns: m(
      () => [i.getAllColumns(), i._getOrderColumnsFn()],
      (c, g) => {
        let p = c.flatMap((S) => S.getLeafColumns());
        return g(p);
      },
      C(e, 'debugColumns')
    ),
    getColumn: (c) => i._getAllFlatColumnsById()[c]
  };
  Object.assign(i, f);
  for (let c = 0; c < i._features.length; c++) {
    const g = i._features[c];
    g == null || g.createTable == null || g.createTable(i);
  }
  return i;
}
function wt() {
  return (e) =>
    m(
      () => [e.options.data],
      (o) => {
        const t = { rows: [], flatRows: [], rowsById: {} },
          n = function (i, r, l) {
            r === void 0 && (r = 0);
            const s = [];
            for (let a = 0; a < i.length; a++) {
              const d = je(
                e,
                e._getRowId(i[a], a, l),
                i[a],
                a,
                r,
                void 0,
                l == null ? void 0 : l.id
              );
              if (
                (t.flatRows.push(d),
                (t.rowsById[d.id] = d),
                s.push(d),
                e.options.getSubRows)
              ) {
                var u;
                (d.originalSubRows = e.options.getSubRows(i[a], a)),
                  (u = d.originalSubRows) != null &&
                    u.length &&
                    (d.subRows = n(d.originalSubRows, r + 1, d));
              }
            }
            return s;
          };
        return (t.rows = n(o)), t;
      },
      C(e.options, 'debugTable', 'getRowModel', () => e._autoResetPageIndex())
    );
}
function vt(e) {
  const o = [],
    t = (n) => {
      var i;
      o.push(n),
        (i = n.subRows) != null &&
          i.length &&
          n.getIsExpanded() &&
          n.subRows.forEach(t);
    };
  return (
    e.rows.forEach(t), { rows: o, flatRows: e.flatRows, rowsById: e.rowsById }
  );
}
function ht(e) {
  return (o) =>
    m(
      () => [
        o.getState().pagination,
        o.getPrePaginationRowModel(),
        o.options.paginateExpandedRows ? void 0 : o.getState().expanded
      ],
      (t, n) => {
        if (!n.rows.length) return n;
        const { pageSize: i, pageIndex: r } = t;
        let { rows: l, flatRows: s, rowsById: u } = n;
        const a = i * r,
          d = a + i;
        l = l.slice(a, d);
        let f;
        o.options.paginateExpandedRows
          ? (f = { rows: l, flatRows: s, rowsById: u })
          : (f = vt({ rows: l, flatRows: s, rowsById: u })),
          (f.flatRows = []);
        const c = (g) => {
          f.flatRows.push(g), g.subRows.length && g.subRows.forEach(c);
        };
        return f.rows.forEach(c), f;
      },
      C(o.options, 'debugTable')
    );
}
function _t() {
  return (e) =>
    m(
      () => [e.getState().sorting, e.getPreSortedRowModel()],
      (o, t) => {
        if (!t.rows.length || !(o != null && o.length)) return t;
        const n = e.getState().sorting,
          i = [],
          r = n.filter((u) => {
            var a;
            return (a = e.getColumn(u.id)) == null ? void 0 : a.getCanSort();
          }),
          l = {};
        r.forEach((u) => {
          const a = e.getColumn(u.id);
          a &&
            (l[u.id] = {
              sortUndefined: a.columnDef.sortUndefined,
              invertSorting: a.columnDef.invertSorting,
              sortingFn: a.getSortingFn()
            });
        });
        const s = (u) => {
          const a = u.map((d) => ({ ...d }));
          return (
            a.sort((d, f) => {
              for (let g = 0; g < r.length; g += 1) {
                var c;
                const p = r[g],
                  S = l[p.id],
                  w = S.sortUndefined,
                  R = (c = p == null ? void 0 : p.desc) != null ? c : !1;
                let h = 0;
                if (w) {
                  const _ = d.getValue(p.id),
                    M = f.getValue(p.id),
                    $ = _ === void 0,
                    D = M === void 0;
                  if ($ || D) {
                    if (w === 'first') return $ ? -1 : 1;
                    if (w === 'last') return $ ? 1 : -1;
                    h = $ && D ? 0 : $ ? w : -w;
                  }
                }
                if ((h === 0 && (h = S.sortingFn(d, f, p.id)), h !== 0))
                  return R && (h *= -1), S.invertSorting && (h *= -1), h;
              }
              return d.index - f.index;
            }),
            a.forEach((d) => {
              var f;
              i.push(d),
                (f = d.subRows) != null &&
                  f.length &&
                  (d.subRows = s(d.subRows));
            }),
            a
          );
        };
        return { rows: s(t.rows), flatRows: i, rowsById: t.rowsById };
      },
      C(e.options, 'debugTable', 'getSortedRowModel', () =>
        e._autoResetPageIndex()
      )
    );
}
/**
 * react-table
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function ue(e, o) {
  return e ? (Ft(e) ? E.createElement(e, o) : e) : null;
}
function Ft(e) {
  return $t(e) || typeof e == 'function' || xt(e);
}
function $t(e) {
  return (
    typeof e == 'function' &&
    (() => {
      const o = Object.getPrototypeOf(e);
      return o.prototype && o.prototype.isReactComponent;
    })()
  );
}
function xt(e) {
  return (
    typeof e == 'object' &&
    typeof e.$$typeof == 'symbol' &&
    ['react.memo', 'react.forward_ref'].includes(e.$$typeof.description)
  );
}
function Pt(e) {
  const o = {
      state: {},
      onStateChange: () => {},
      renderFallbackValue: null,
      ...e
    },
    [t] = E.useState(() => ({ current: Rt(o) })),
    [n, i] = E.useState(() => t.current.initialState);
  return (
    t.current.setOptions((r) => ({
      ...r,
      ...e,
      state: { ...n, ...e.state },
      onStateChange: (l) => {
        i(l), e.onStateChange == null || e.onStateChange(l);
      }
    })),
    t.current
  );
}
const Mt = ({ data: e }) => {
  var u;
  const { index: o, columns: t, data: n } = e,
    i = E.useMemo(
      () =>
        t.map((a) => ({
          accessorKey: a,
          header: ({ column: d }) => {
            const f = d.getIsSorted();
            return v.jsxs('div', {
              className: 'flex items-center cursor-pointer',
              onClick: () => d.toggleSorting(),
              children: [
                a,
                f === 'asc' && v.jsx(Fe, { className: 'ml-2 !size-3' }),
                f === 'desc' && v.jsx($e, { className: 'ml-2 !size-3' })
              ]
            });
          }
        })),
      [t]
    ),
    r = E.useMemo(
      () =>
        n.map((a, d) => {
          const f = { id: o[d] };
          return (
            t.forEach((c, g) => {
              f[c] = a[g];
            }),
            f
          );
        }),
      [n, t, o]
    ),
    l = Pt({
      data: r,
      columns: i,
      getCoreRowModel: wt(),
      getPaginationRowModel: ht(),
      getSortedRowModel: _t(),
      initialState: { pagination: { pageSize: 10 } }
    }),
    s = E.useCallback(
      () =>
        Array.from({ length: l.getPageCount() }, (a, d) =>
          v.jsx(
            j,
            {
              children: v.jsx(xe, {
                onClick: () => l.setPageIndex(d),
                isActive: l.getState().pagination.pageIndex === d,
                children: d + 1
              })
            },
            d
          )
        ),
      [l.getPageCount(), l.getState().pagination.pageIndex]
    );
  return v.jsxs('div', {
    className: 'flex flex-col gap-2 h-full overflow-y-auto dataframe',
    children: [
      v.jsx('div', {
        className: 'rounded-md border overflow-y-auto',
        children: v.jsxs(Pe, {
          children: [
            v.jsx(Me, {
              children: l
                .getHeaderGroups()
                .map((a) =>
                  v.jsx(
                    B,
                    {
                      children: a.headers.map((d) =>
                        v.jsx(
                          Ve,
                          {
                            children: d.isPlaceholder
                              ? null
                              : ue(d.column.columnDef.header, d.getContext())
                          },
                          d.id
                        )
                      )
                    },
                    a.id
                  )
                )
            }),
            v.jsx(Ie, {
              children:
                (u = l.getRowModel().rows) != null && u.length
                  ? l
                      .getRowModel()
                      .rows.map((a) =>
                        v.jsx(
                          B,
                          {
                            children: a
                              .getVisibleCells()
                              .map((d) =>
                                v.jsx(
                                  re,
                                  {
                                    children: ue(
                                      d.column.columnDef.cell,
                                      d.getContext()
                                    )
                                  },
                                  d.id
                                )
                              )
                          },
                          a.id
                        )
                      )
                  : v.jsx(B, {
                      children: v.jsx(re, {
                        colSpan: t.length,
                        className: 'h-24 text-center',
                        children: 'No results.'
                      })
                    })
            })
          ]
        })
      }),
      v.jsx(ye, {
        children: v.jsxs(Ee, {
          className: 'ml-auto',
          children: [
            v.jsx(j, {
              children: v.jsx(De, {
                onClick: () => l.previousPage(),
                className: l.getCanPreviousPage()
                  ? 'cursor-pointer'
                  : 'pointer-events-none opacity-50'
              })
            }),
            s(),
            v.jsx(j, {
              children: v.jsx(He, {
                onClick: () => l.nextPage(),
                className: l.getCanNextPage()
                  ? 'cursor-pointer'
                  : 'pointer-events-none opacity-50'
              })
            })
          ]
        })
      })
    ]
  });
};
function It({ element: e }) {
  const { data: o, isLoading: t, error: n } = ve(e.url || null),
    i = E.useMemo(() => {
      if (o) return JSON.parse(o);
    }, [o]);
  return t
    ? v.jsx('div', {
        className: 'flex items-center justify-center h-full w-full bg-muted',
        children: v.jsx(he, {})
      })
    : n
    ? v.jsx(_e, { variant: 'error', children: n.message })
    : v.jsx(Mt, { data: i });
}
export { It as default };
