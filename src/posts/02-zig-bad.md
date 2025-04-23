---
title: "Zig: The Bad Parts"
date: 2025-04-22
---

Zig has [mostly good parts.](./zig-good). However, there are some bad parts
both technical and social. I'll start with the technical ones.

## Builtins vs syntax

There are some builtins that I'd prefer as syntax and some syntax that I'd
prefer as builtins. There is also some overlap like
[`@mod`](https://ziglang.org/documentation/0.14.0/#mod) vs `%`. It's not
immediately clear what the difference is between the language and the builtins
and when to reach for a builtin.

## No interfaces

How can I constrain `T` to additive types here?
```zig
fn foo(comptime T: type) T {
    const a: T = 3;
    const b: T = 5;
    return a + b;
}
```

This becomes a big problem with readers and writers:
```zig
fn foo(comptime Reader: type) void {
    // what methods can I use on `Reader`?
    return struct {
        // what do you expect this function to do?
        pub fn read(self: @This(), buffer: []u8) ReadError!usize {
        }
    };
}
```

...and the recurring error casting problem has led to `std.io.GenericReader`
and `std.io.GenericWriter`. Sure would be nice if there was a clear interface
that covered most use cases!

## Cannot add function declaration with `@Type`

Sometimes you need to give users structs with custom fields AND custom
functions. Currently for
[flatbuffers](https://github.com/clickingbuttons/flatbuffers-zig) I use a code
generation step to do this, but it's not ideal.

## Source file structs

I find this
["feature"](https://ziglang.org/documentation/0.14.0/#Source-File-Structs)
a confusing abuse of `@import()` returning a struct rather than a
nice feature that avoids typing `const Foo = struct {`. It also doesn't work
with other containers like unions.

## Only integer error values

Sometimes you really want to bubble up details of an error value at runtime.
Right now you can only log immediately at the call site and return an integer:

```zig
fn foo(bar: i32) !i32 {
    if (bar < 0) {
        log.err("cannot `foo` {} which is < 0", .{ bar });
        return BadBarError;
    }
    return bar * 2;
}
```

I'd like to be able to do this:

```zig
fn foo(bar: i32) !i32 {
    if (bar < 0) {
        return BadBarError{ .bar = bar };
    }
    return bar * 2;
}
```

...without this workaround that doesn't support `try foo(bar)`:

```zig
const Result = union(enum) {
    good: i32,
    bad: i32,
};

fn foo(bar: i32) Result {
    if (bar < 0) {
        return .{ .bad = bar };
    }
    return .{ .good = bar * 2 };
}
```

## Bugs, bugs, and more bugs...

I've
[had](https://github.com/ziglang/zig/issues/16347)
[some](https://github.com/ziglang/zig/issues/16440)
[flagrant](https://github.com/ziglang/zig/issues/18966)
[errors](https://github.com/ziglang/zig/issues/19606)
[over](https://github.com/ziglang/zig/issues/19607)
[the](https://github.com/ziglang/zig/issues/19452#issuecomment-2057740650)
[years](https://github.com/ziglang/zig/issues/20148),
and there's
[still](https://github.com/ziglang/zig/issues/19616)
[some](https://github.com/ziglang/zig/issues/20055)
open even though I haven't touched the language in over a year.

This is to be expected for a beta language, but it's still bad.

## conf`usingnamespace`

This hurts code readability since I don't know which `usingnamespace` a
declaration comes from. Here's the
[discussion to remove it.](https://github.com/ziglang/zig/issues/20663)

## Async

Is it a good thing? What should the runtime prioritize? Should closures become
first-class?

## LLVM is slow

[This will be fixed eventually,](https://github.com/ziglang/zig/issues/16270)
but in the meantime, LLVM's code quality is usually not worth the wait.

```sh
> zig build
LLVM Emit Object...
```

## Mission statement

Let's move onto the social problems. Andrew turned Zig into a non-profit
[in 2020,](https://ziglang.org/news/announcing-zig-software-foundation/) which
is a good thing. Let's break down its full mission statement:

> The mission of the Zig Software Foundation is to promote, protect, and
> advance the Zig programming language,

Protect it from whom? Admins merging things they shouldn't?

> to support and facilitate the growth of a diverse and international
> community of Zig programmers,

Diverse in what sense? Ethnicity? Why does that matter to a programming
language?

> and to provide education and guidance to students,

What guidance to what kind of students?

> teaching the next generation of programmers to be competent, ethical, and to
> hold each other to high standards.

Competent in what sense? Handling all error paths in their code? Ethical
according to whom? US law firms specializing in copyright law? What standards?
The [Zig style guide?](https://ziglang.org/documentation/0.14.0/#Style-Guide)

## Who is in charge?

Zig's [bus factor](https://en.wikipedia.org/wiki/Bus_factor) is one
[Andrew Kelley](https://github.com/andrewrk). I've listened to all his talks,
most of his livestreams, and read 1000s of his chat messages. I agree with him
95% of the time, which is really special.

While I trust his technical leadership, I'm not so sure about his social
leadership. What drives Andrew's non-technical decisions? Who does he trust
with what, and why? How is he managing the few developers he employs? Why did
a $5k bounty on an issue make him
[write this angry post?](https://ziglang.org/news/bounties-damage-open-source-projects/)

While the non-profit does hold him accountable for the money he spends, I do
wish there was a board to hold him accountable to the mission statement for
the decisions he makes both online and offline.

## Poor crypto contribution experience

I've done probably ~1mo worth of unpaid work on Zig's stdlib and generally
have been treated poorly. I contributed only when I faced bugs.

I faced a
[bug in the TLS client.](https://github.com/ziglang/zig/issues/15226) The
existing code was (and still is) very difficult to read and understand. The
client code failed to abstract the TLS layer which makes sharing it with the
[TLS server](https://github.com/ziglang/zig/issues/14171) untenable.

So I wrote a [giant patch.](https://github.com/ziglang/zig/pull/19308) that
worked. Similar giant patches have been merged before, but the unofficial
crypto maintainer with merge permissions wanted it broken up into smaller
patches. He specified exactly how he wanted it broken up and I obeyed.

At first the ball was rolling, but then
[nearly 4mo passed](https://github.com/ziglang/zig/pull/19986#pullrequestreview-2373407230) for a small patch that he asked for. During that period the
maintainer was active on Github... I guess he forgot multiple times or didn't
care.

## Poor DateTime contribution experience

While doing that, I had to touch some DateTime methods that were buggy and may
actually be a CVE. Rather than just solve my local problem I wanted to solve it
for the whole stdlib which had three different implementations. I wanted to do
so without compromise -- making it as fast and generic as possible.

So I researched the state of the art for date math
[(which is pretty cool!)](https://onlinelibrary.wiley.com/doi/epdf/10.1002/spe.3172)
and spent a couple weeks
[implementing and testing it.](https://github.com/ziglang/zig/pull/19549#issuecomment-2062091512)

I commented on the existing DateTime proposal with my findings and opened a
PR that I hope would move the conversation forward. Andrew rejected the PR with
a terse non-technical answer and did not comment on the proposal.

He encouraged me to make a 3rd party DateTime library that may one day be
upstreamed. But wait! This contradicts with the first point of his hatred for
bug bounties:

> Bounties foster competition at the expense of cooperation.

Now we get to compete downstream instead of cooperate upstream. Sweet! The
solution Andrew likes will likely have its license violated to be copied
upstream. Is this what the ZSF means by:

> teaching the next generation of programmers to be competent, ethical, and to
> hold each other to high standards.

?

## ...back to crypto

It's not clear how to win support for technical solutions. Take for example the
TLS server -- everyone (including Andrew) wants a TLS server and I've
implemented it twice upstream. A couple others have implemented it downstream
as well.

What's the official path for implementing it upstream? Do I wait around for
bi-annual reviews on small PRs? Do I do it all in one fell swoop and hope the
crypto maintainer stays quiet and someone else with authority blesses it?

I feel taken advantage of. I worked hard for the promise of getting a timely
review, but the review came late and without thankfulness. I may have the best
technical solution that exists -- but no Zig team member seems to care much.

I want to cooperate with others, and maybe even chat about technical decisions
before coding them (imagine that!), but I don't think Andrew wants that unless
it's a place he's currently interested in. That's understandable, but I think
he should delegate who is in charge of what parts of the codebase and hold them
accountable.

That's what good leaders do. They delegate and hold accountable. They encourage
cooperation towards a goal. I think everyone can agree the goals of a better
DateTime (where cstdlib still beats Zig), or a TLS server (where again, mature
C libraries beats Zig's stdlib) are good goals the community should work
towards.

Currently I am very much discouraged towards cooperation because the people
with authority don't review my PRs in a timely manner! I don't want a temporary
fix of copying Zig's HTTP stack to fix a bug in TLS client code. I want a
permanent fix upstream. I'm willing to work on it for a month with a core team
member and commit to one of us maintaining it.

I wish a core team member wanted the same. If you do, I'm willing to give Zig a
2nd chance.
