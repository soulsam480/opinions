# Practices

This chapter is less likely to be adopted by most of the readers as I'm very particular in how I write code.

## reactive declarations
vue's reactivity system is really flexible. the most impressive part is it doesn't depend on `vue components` to declare and consume reactive variables. this makes it really easy to manage reactive state inside and outside of vue components. 

Commonly we use `ref` for standalone reactive variables. even though we can also use `reactive` to declare a state object with reactive children, it's totally fine and i also recommend to just use `ref` to declare multiple vars. This will make the code look cleaner and easier to separate them by concern instead of putting them all together at one place.

These are some practices I follow while declaring reactive variables.

### you may not need reactivity at all

Yes, while it's tempting to just create a new `ref`, you may not actually need it. For example.

```vue
<script lang="ts">
export default {
    setup(){
        const name = ref('sambit')

        function someFunc(){
            console.log(name.value)
        }

        name.value = 'sahoo'

        someFunc() // logs 'sahoo'
    }
}
</script>
```
In the above scenario notice that we're declaraing a variable name which is a `ref`, but we are not exposing the variable to template thus not really using `ref` reactivity. Here the same results can be achieved by making it a normal variable with `let`, where assignments will change the value.

```vue
<script lang="ts">
export default {
    setup(){
        let name = 'sambit'

        function someFunc(){
            console.log(name)
        }

        name = 'sahoo'

        someFunc() // logs 'sahoo'
    }
}
</script>
```
### consider [`shallowRef`](https://staging.vuejs.org/api/reactivity-advanced.html#shallowref) while working with large data structures

vue docs also [point out the same](https://staging.vuejs.org/guide/best-practices/performance.html#reduce-reactivity-overhead-for-large-immutable-structures) that while working with large data structures, it's better to use `shallowRef` instead of normal `ref`, to reduce reactivity overhead. `ref` is by default `deeply` reactive, which means all nested children will also be made reactive. in those cases, it better to use `shallowRef` and trigger effects using [`triggerRef`](https://staging.vuejs.org/api/reactivity-advanced.html#triggerref). This might sound like a lot of work, but trust me, the results will be noticable with an increase in rendering perf.

```vue
<script setup>
// Bad if not utilizing deep reactivity
const hugeNestedDS = ref({
    nested:{
        child:{
            nested:[{
                more: 'nesting'
            }]
        }
    }
})

// Better
const hugeNestedDS = shallowRef({
    nested:{
        child:{
            nested:[{
                more: 'nesting'
            }]
        }
    }
})

// auto trigger effects
hugeNestedDS.value = {
    //....
}

// manually trigger effects
function someTask(){
    // .....
    triggerRef(hugeNestedDS)
}
</script>

```

### wrap provided object of `ref`s with `reactive` to retain reactivity after injection

this was the most common mistake I did and the lesson was the most usefull for me as I temd to use the `provide/inject` API a lot. When providing an object of `ref`s, the reactive connection will be lost after injection. for example.

```ts
const a = ref('sambit')
const b = ref('sahoo')

// parent 
provide('my-key', {a,b})

// child
// reactive connection is lost
const { a, b } = inject('my-key')
```
In the above scenario, changing the value of `ref`s won't trigger effcts in child or injected component. the solution is wrapping the `ref`s inside `reactive` and then providing the reactive state. e.g.


```ts
const a = ref('sambit')
const b = ref('sahoo')

const providedState = recative({a,b})

// parent 
provide('my-key', providedState)

// child
// reactivity retained
const state = inject('my-key')

// auto unwrapped, no `.value` needed
state.a
state.b
```