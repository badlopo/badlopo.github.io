---
title: Dart 中的 lazy Iterable
category: dart
created: 2024/11/15
---

> Environment:
> - Dart SDK version: 3.5.3 (stable)

---

机缘巧合之下, 看到 `Iterable` 的 `map` 方法有以下一段注释:

> Methods on the returned iterable are allowed to omit calling `toElement`  
> on any element where the result isn't needed.  
> For example, \[elementAt\] may call `toElement` only once.

又看到 `Iterable` 上的多个方法都提到了 `Returns a new lazy Iterable` 的字样, 于是对 `lazy` 做了一下学习

## 关于 Returns a new lazy Iterable

## 关于 omit calling

## References

- [Comment source](https://github.com/dart-lang/sdk/blob/179da3ba67ead156a3ba718bd798cb7a1728e741/sdk/lib/core/iterable.dart#L215-L217)
