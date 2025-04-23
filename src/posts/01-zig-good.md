---
title: "Zig: The Good Parts"
date: 2025-04-22
---

![Zig logo](../../assets/zig.svg)

I've spent a few hundred hours writing [Zig](https://ziglang.org/) and I think
its the best systems programming language. Here are the good parts.

## What I wrote

- An [Apache Arrow library](https://github.com/clickingbuttons/arrow-zig)
  - [Flatbuffers](https://github.com/clickingbuttons/flatbuffers-zig)
  - [LZ4](https://github.com/clickingbuttons/lz4)
- A [TLS1.3 client and server](https://github.com/ziglang/zig/pull/19308)
  - An [ASN.1 parser](https://github.com/ziglang/zig/pull/19976)
  - A generic [DateTime library](https://github.com/clickingbuttons/datetime)

## Variable-width integers

Variable-width integers help the programmer and the compiler. Suppose you need
to represent a value between 0 and 128 and choose Zig's `u7`:
- The programmer enjoys [overflow checking](#overflow) to verify assertions
- The compiler enjoys the tightest constraint possible to generate fast code

I never really thought of math in terms of bounded ranges until using Zig.
Now it seems natural to me because arbitrary precision doesn't physically
exist.

## Overflow

![Overflowing bucket](../../assets/overflowing-bucket.png)

Zig gets arithmetic operators right by exposing the ugly truth: your
math can overflow. It assumes that integer types won't overflow and will panic
unless you specify saturating or overflowing arithmetic:

```zig fname="overflow.zig"
@as(u8, 0xff) + 1; // panic: overflow
@as(u8, 0xff) +% 1; // overflow allowed: 0
@as(u8, 0xff) +| 1; // saturating allowed: 0xff
```

It even works with the variable-width types (albeit with ugly generated code):

```zig fname="overflow2.zig"
@as(u7, 0xef) + 1; // panic: overflow
```

## Only-public struct declarations

You cannot hide struct fields.
You must trust your users.
I LOVE this because your users can always workaround you by forking your code.

```zig fname="Foo.zig"
const Foo = struct {
    bar: i32, // There is no way to hide this field.
    fn baz(self: @This()): void {} // However, you can hide functions.
    pub fn bing(self: @This()): void {} // ...or expose functions.
};
```

## Packed structs

![Packed suitcase](../../assets/packed-suitcase.png)

In the current memory-constrained world packing structs can be a real
difference maker.
Thanks to variable-width integers, packed structs have a really nice syntax:

```zig fname="Divided.zig"
const Divided = packed struct(u16) {
    half1: u8,
    quarter3: u4, // Accessed like any other member.
    quarter4: u4, // Generates code that uses bit masks.
};
```

## Comptime

I have found myself in so many situations in C++ or Rust where the templating
language doesn't allow me to dynamically generate the code I want.
Well, Zig does so via
[`comptime`](https://ziglang.org/documentation/0.14.0/#comptime) and
[`@Type`.](https://ziglang.org/documentation/0.14.0/#Type)

It's simple and beautiful:

```zig fname="List.zig"
fn List(comptime T: type) type {
    // You can do (almost) anything with T.
    return struct {
        items: []T,
        len: usize,
    };
}

var buffer: [10]i32 = undefined;
var list = List(i32){
    .items = &buffer,
    .len = 0,
};
```

## Strict pointer types

![Spidermans pointing](../../assets/spidermans-pointing.jpg)

Arrays are slices by default.
Slices allow bounds checking, which prevent a whole host of errors.

I like the extra safety of sentinel pointer types.
Putting alignment in pointer types is also good for safety.
Opaque pointer types are a good compromise for compatibility with C.

The official docs have
[good examples](https://ziglang.org/documentation/master/#Pointers) of the
syntax and usage.

## No multiline comments

This makes tokenization simpler for both humans and machines.

```c fname="multiline-comment.c"
/**
 * This multiline comment is valid in most C-style languages, but invalid in
 * Zig. I personally dislike these comments because while they're perfectly
 * readable, they're not perfectly writeable without a smart editor inserting
 * extra text for you. Yuck.
 */
```

## Good builtin docs

Zig has different syntax for documenting files and declarations.
It generates
[reasonable HTML documentation.](https://ziglang.org/documentation/master/std)

```zig fname="Timestamp.zig"
//! Date types for my cool app. This will be a module comment.

/// Seconds and nanoseconds.
const Timestamp = struct {
    /// The number of seconds since the epoch
    seconds: i64,
    /// The number of nanoseconds past the second
    nanos: u32,
    /// Returns a `Timestamp` struct representing the Unix epoch; that is, the
    /// moment of 1970 Jan 1 00:00:00 UTC
    pub fn unixEpoch() Timestamp {
        return Timestamp{
            .seconds = 0,
            .nanos = 0,
        };
    }
};
```

## Multiline strings

No other language I know lets me keep my tabulation with multiline strings.

```js fname="❌multiline-string.js"
function foo() {
    const string = `this
is NOT tabbed over and is
difficult to read and write`;
}
```

```c fname="❌multiline-string.c"
void foo() {
    char* string = "this\n" +
        "is tabbed over, BUT\n" +
        "requires trailing newlines which are readable,\n" +
        "but annoying to write";
}
```

```zig fname="✅multiline-string.zig"
fn foo() {
    const string = \\this
        \\is tabbed over and is
        \\easy to read and write
        \\...except for that pesky trailing semicolon
        ;
}
```

## Unicode identifiers

import { UnicodeTable } from "../unicode-table";

<UnicodeTable from="☀" length={24} />

These can come in handy with codegen:

```zig fname="unicode-ids.zig"
const @"~@#$%^😊" = 32;
```

## Modules

Module systems are the best way for programmers to share code.
They can make or break language ecosystems.
Zig declarations are file-scoped unless you add a `pub` prefix.

```zig fname="root.zig"
const foo = 3;
pub const bar = 4;
```

Zig chooses the file system as the module tree and requires explicit imports:

```zig fname="use-bar.zig"
const root = @import("./root.zig");
const myBar = root.bar;
```

You can import other modules by specifying them in `build.zig`. The special
`std` module is always available:
```zig fname="use-std.zig"
const std = @import("std");
```

Dependencies are decentralized tarballs stored with the hashes of their
file contents in `zig.zon`.
In a world where tarball hosting is mostly solved, this is a great system.

## Switch statement

Switch statements are exhaustive to catch logic errors. I enjoy the syntax:

```zig fname="switch-else.zig"
switch (foo) {
    2...4 => |v| { // love the range and capture
    },
    else => unreachable, // nice!
}
```

...and the special syntax for enums:
```zig fname="switch-enum.zig"
switch (my_enum) {
    .one => true,
    .two, .three => false,
    _ => false, // if we add a `.four` this will be a compile error
};
```

## C compatibility

`@cImport` and friends work surprisingly well, even on hacky macros.
Exporting C libraries naturally works well.

This is a huge win if you want to lean on the large existing C ABI ecosystem.

## Assembly support

Often required for systems programmers:

```zig fname="asm.zig"
pub fn syscall1(number: usize, arg1: usize) usize {
    return asm volatile ("syscall"
        : [ret] "={rax}" (-> usize),
        : [number] "{rax}" (number),
          [arg1] "{rdi}" (arg1),
        : "rcx", "r11"
    );
}
```

## build.zig and cross-compiling

Zig is the best build system for binaries I've ever used.
You write Zig to build Zig -- no need for an extra declarative language.
You can hook into whatever you want and have an entire systems language at
your disposal.

Zig supports tons of target triplets, including GPUs. You can build any target
from any host. The task runner builds a dependency graph and parallelizes tasks
across your cores.

It's a breath of fresh air. Why don't all languages have first-class build
tools?

## Error handling

![Car on fire](../../assets/car-fire.jpg)

[Error return traces](https://ziglang.org/documentation/0.14.0/#Error-Return-Traces)
are the best crash experience you can have.

As for error handling, the `ErrorSet!Rettype` and `try` syntaxes are just
annoying enough to remind you that they're there:

```zig fname="error-handling.zig"
const std = @import("std");

pub fn main() !void { // == anyerror!void
    var file = try std.fs.cwd().openFile("foo.txt", .{});
    defer file.close();
}
```

## Testing

Inline unit tests are good for any complex code you want to verify and much
better than writing separate files:

```zig fname="test.zig"
const std = @import("std");
const expect = std.testing.expect;

test "coercion to error unions" {
    const x: anyerror!i32 = 1234;
    const y: anyerror!i32 = error.Failure;

    try expect((try x) == 1234);
    try std.testing.expectError(error.Failure, y);
}
```

You can run them with `zig test`, and they end up in the docs!

## Non-profit Zig Software Foundation (ZSF)

This is a great way to transparently handle funds for a
[mission statement](https://ziglang.org/zsf/) that benefits the language.

## Summary

Zig is the best systems programming language.
I'm not sure it will overtake C, but it sure will try!
Keep your eye on it as it works towards its 1.0.0 release.
