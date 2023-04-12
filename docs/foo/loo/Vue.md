# Vue学习路线

# $router和$route的区别
`Vue Router`是`Vue.js`的路由管理器，路由就是`SPA`单页应用的访问路径，在`Vue`实例内部，可以通过`$router`访问路由实例，即在路由定义文件中`export default`的`new Router(/*...*/)`路由实例，通过`$route`可以访问当前激活的路由的状态信息，包含了当前`URL`解析得到的信息，还有`URL`匹配到的路由记录，可以将`$router`理解为一个容器去管理了一组`$route`，而`$route`是进行了当前`URL`和组件的映射。

## $router对象属性
* `$router.app`: 配置了`router`的`Vue`根实例。
* `$router.mode`: 路由使用的模式。
* `$router.currentRoute`: 当前路由对应的路由信息对象。

## $router对象方法
* `$router.beforeEach(to, from, next)`: 全局前置守卫，守卫是异步解析执行，此时导航在所有守卫`resolve`完之前一直处于等待中状态，守卫方法接收三个参数: `to: Route`即将要进入的目标路由对象、`from: Route`: 当前导航正要离开的路由、`next: Function`: 调用该方法来`resolve`这个钩子，执行效果依赖`next`方法的调用参数，例如`next()`、`next(false)`、`next('/')`、`next({path:'/',name:'home',replace:true,query:{q:1}})`、`next(error)`等，通常在`main.js`中`import`的`Vue Router`实例中直接定义导航守卫，当然也可在`Vue`实例中访问`$router`来定义。
* `$router.beforeResolve(to, from, next)`: 全局解析守卫，在`beforeRouteEnter`调用之后调用，同样接收`to`、`from`、`next`三个参数。
* `$router.afterEach(to, from)`: 全局后置钩子，进入路由之后调用，接收`to`、`from`两个参数。
* `$router.push(location[, onComplete[, onAbort]])`: 编程式导航，使用`$router.push`方法导航到不同的`URL`，此方法会向`history`栈添加一个新的记录，当点击浏览器后退按钮时，则回到之前的`URL`。
* `$router.replace(location[, onComplete[, onAbort]])`: 编程式导航，跟`$router.push`很像，唯一的不同就是，其不会向`history`添加新记录，而是跟它的方法名一样替换掉当前的`history`记录。
* `$router.go(n)`: 编程式导航，这个方法的参数是一个整数，意思是在`history`记录中向前或者后退多少步，类似`window.history.go(n)`。
* `$router.back()`: 编程式导航，后退一步记录，等同于`$router.go(-1)`。
* `$history.forward()`: 编程式导航，前进一步记录，等同于`$router.go(1)`。
* `$router.getMatchedComponents([location])`: 返回目标位置或是当前路由匹配的组件数组 ，是数组的定义或构造类，不是实例，通常在服务端渲染的数据预加载时使用。
* `$router.resolve(location[, current[, append]])`: 解析目标位置，格式和`<router-link>`的`to prop`相同，`current`是当前默认的路由，`append`允许在`current`路由上附加路径，如同 `router-link`。
* `$router.addRoutes(route)`: 动态添加更多的路由规则，参数必须是一个符合`routes`选项要求的数组。
* `$router.onReady(callback[, errorCallback])`: 该方法把一个回调排队，在路由完成初始导航时调用，这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件，这可以有效确保服务端渲染时服务端和客户端输出的一致，第二个参数`errorCallback`会在初始化路由解析运行出错时被调用。
* `$router.onError(callback)`: 注册一个回调，该回调会在路由导航过程中出错时被调用，被调用的错误必须是下列情形中的一种，错误在一个路由守卫函数中被同步抛出、错误在一个路由守卫函数中通过调用`next(err)`的方式异步捕获并处理、渲染一个路由的过程中需要尝试解析一个异步组件时发生错误。

## $route对象属性 
* `$route.path`: 返回字符串，对应当前路由的路径，总是解析为绝对路径。
* `$route.params`: 返回一个`key-value`对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象。
* `$route.query`: 返回一个`key-value`对象，表示`URL`查询参数。
* `$route.hash`: 返回当前路由的带`#`的`hash`值，如果没有`hash`值，则为空字符串。
* `$route.fullPath`: 返回完成解析后的`URL`，包含查询参数和`hash`的完整路径。
* `$route.matched`: 返回一个数组，包含当前路由的所有嵌套路径片段的路由记录，路由记录就是`routes`配置数组中的对象副本。
* `$route.name`: 如果存在当前路由名称则返回当前路由的名称。
* `$route.redirectedFrom`: 如果存在重定向，即为重定向来源的路由的名字。

# data为何以函数形式返回
在使用`Vue`构建组件化应用时，每个组件的`data`属性都是以函数形式返回的，这主要是在组件化实现的时候，每个实例可以维护一份被返回对象的独立的拷贝，而不是共享同一个对象的引用。

## Vue简单实例
在一个`Vue`简单实例中，也就是不使用组件化实现的时候，`data`可以是一个对象，因为本身也只有一个实例，就不存在多个实例共享的问题。

```html
<!DOCTYPE html>
<html>
<head>
    <title>Vue</title>
</head>
<body>
    <div id="app">
        <div>{{msg}}</div>
    </div>
</body>
<script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
<script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        data: {
            msg: 'Vue Instance'
        }
    })
</script>
</html>
```

## 组件化实例
如果是使用`Vue`的组件化实例，那么`data`属性就必须以函数的形式返回，如果不使用函数的形式返回，可能会出现一些意料之外的情况，比如下面的例子中，按钮组件是复用的，在点击第一个按钮时本身应该只有第一个按钮`+1`，但是所有的按钮都跟随`+1`。请注意，在此处仍然是使用函数的形式返回，这是因为如果在组件化实现中如果不使用函数的形式返回`Vue`会直接报错，但是实现的效果是相同的，虽然是以函数的形式返回，但是返回的对象中`count`属性都是指向了对于`counter`对象的引用，本质上依旧是多个组件实例共享一个对象，实际效果与以对象的形式直接返回相同。

```html
<!DOCTYPE html>
<html>
<head>
    <title>Vue</title>
</head>
<body>
    <div id="app">
        <button-counter></button-counter>
        <button-counter></button-counter>
        <button-counter></button-counter>
    </div>
</body>
<script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
<script type="text/javascript">
    var counter = {
        count: 0
    }
    Vue.component('button-counter', {
      data: function(){
          return counter;
      },
      template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
    })
    var vm = new Vue({
        el: '#app'
    })
</script>
</html>
```

所以为了规避这种现象，在组件化实现的时候，`data`属性必须以函数的形式返回，以便每个实例可以维护一份被返回对象的独立的拷贝，而不是共享同一个对象的引用。


```html
<!DOCTYPE html>
<html>
<head>
    <title>Vue</title>
</head>
<body>
    <div id="app">
        <button-counter></button-counter>
        <button-counter></button-counter>
        <button-counter></button-counter>
    </div>
</body>
<script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
<script type="text/javascript">
    Vue.component('button-counter', {
      data: function(){
          return {
            count: 0
          }
      },
      template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
    })
    var vm = new Vue({
        el: '#app'
    })
</script>
</html>
```
# MVVM模式的理解
`MVVM`全称`Model-View-ViewModel`是基于`MVC`和`MVP`体系结构模式的改进，`MVVM`就是`MVC`模式中的`View`的状态和行为抽象化，将视图`UI`和业务逻辑分开，更清楚地将用户界面`UI`的开发与应用程序中业务逻辑和行为的开发区分开来。

## 描述
`MVVM`模式简化了界面与业务的依赖，有助于将图形用户界面的开发与业务逻辑或数据模型的开发分离开来。在`MVVM`中的`ViewModel`作为绑定器将视图层`UI`与数据层`Model`链接起来，在`Model`更新时，`ViewModel`通过绑定器将数据更新到`View`，在`View`触发指令时，会通过`ViewModel`传递消息到`Model`，`ViewModel`像是一个黑盒，在开发过程中只需要关注于呈现`UI`的视图层以及抽象模型的数据层`Model`，而不需要过多关注`ViewModel`是如何传递的数据以及消息。

## 组成

### Model
* 以面向对象来对对事物进行抽象的结果，是代表真实状态内容的领域模型。
* 也可以将`Model`称为数据层，其作为数据中心仅关注数据本身，不关注任何行为。

### View
* `View`是用户在屏幕上看到的结构、布局和外观，即视图`UI`。
* 当`Model`进行更新的时候，`ViewModel`会通过数据绑定更新到`View`。

### ViewModel
* `ViewModel`是暴露公共属性和命令的视图的抽象。
* `ViewModel`中的绑定器在视图和数据绑定器之间进行通信。
* 在`Model`更新时，`ViewModel`通过绑定器将数据更新到`View`，在`View`触发指令时，会通过`ViewModel`传递消息到`Model`。

## 优点
* 低耦合: 视图`View`可以独立于`Model`变化和修改，一个`ViewModel`可以绑定到不同的`View`上，当`View`变化的时候`Model`可以不变，当`Model`变化的时候`View`也可以不变。
* 可重用性: 可以把一些视图逻辑放在一个`ViewModel`里面，让很多`View`重用这段视图逻辑。
* 独立开发: 开发人员可以专注于业务逻辑和数据的开发`Model`，设计人员可以专注于页面设计。
* 可测试: 界面素来是比较难于测试的，测试行为可以通过`ViewModel`来进行。

## 不足
* 对于过大的项目，数据绑定需要花费更多的内存。
* 数据绑定使得`Bug`较难被调试，当界面异常，可能是`View`的代码有问题，也可能是`Model `的代码有问题，数据绑定使得一个位置的`Bug`可能被快速传递到别的位置，要定位原始出问题的地方就变得不那么容易了。

## 实例
下面是参照`Vue`实现的简单的数据绑定实例，当然对于`Vue`来说，文档中也提到了`Vue`没有完全遵循`MVVM`模型，但是`Vue`的设计也受到了其启发，`https://cn.vuejs.org/v2/guide/instance.html`，关于为什么尤大说`Vue`没有完全遵循`MVVM`，可以参考这个`https://www.zhihu.com/question/327050991`。

```html
<!DOCTYPE html>
<html>
<head>
    <title>数据绑定</title>
</head>
<body>
    <div id="app">
        <div>{{msg}}</div>
        <div>{{date}}</div>
        <button onclick="update()">update</button>
    </div> 
</body>
<script type="text/javascript">

///////////////////////////////////////////////////////////////////////////////
    var Mvvm = function(config) {
        this.$el = config.el;
        this.__root = document.querySelector(this.$el);
        this.__originHTML = this.__root.innerHTML;

        function __dep(){
            this.subscribers = [];
            this.addSub = function(watcher){
                if(__dep.target && !this.subscribers.includes(__dep.target) ) this.subscribers.push(watcher);
            }
            this.notifyAll = function(){
                this.subscribers.forEach( watcher => watcher.update());
            }
        }


        function __observe(obj){
            for(let item in obj){
                let dep = new __dep();
                let value = obj[item];
                if (Object.prototype.toString.call(value) === "[object Object]") __observe(value);
                Object.defineProperty(obj, item, {
                    configurable: true,
                    enumerable: true,
                    get: function reactiveGetter() {
                        if(__dep.target) dep.addSub(__dep.target);
                        return value;
                    },
                    set: function reactiveSetter(newVal) {
                        if (value === newVal) return value;
                        value = newVal;
                        dep.notifyAll();
                    }
                });
            }
            return obj;
        }

        this.$data = __observe(config.data);

        function __proxy (target) {
            for(let item in target){
                Object.defineProperty(this, item, {
                    configurable: true,
                    enumerable: true,
                    get: function proxyGetter() {
                        return this.$data[item];
                    },
                    set: function proxySetter(newVal) {
                        this.$data[item] = newVal;
                    }
                });
            }
        }

        __proxy.call(this, config.data);

        function __watcher(fn){
            this.update = function(){
                fn();
            }

            this.activeRun = function(){
                __dep.target = this;
                fn();
                __dep.target = null;
            }
            this.activeRun();
        }

        new __watcher(() => {
            console.log(this.msg, this.date);
        })

        new __watcher(() => {
            var html = String(this.__originHTML||'').replace(/"/g,'\\"').replace(/\s+|\r|\t|\n/g, ' ')
            .replace(/\{\{(.)*?\}\}/g, function(value){ 
                return  value.replace("{{",'"+(').replace("}}",')+"');
            })
            html = `var targetHTML = "${html}";return targetHTML;`;
            var parsedHTML = new Function(...Object.keys(this.$data), html)(...Object.values(this.$data));
            this.__root.innerHTML = parsedHTML;
        })

    }

///////////////////////////////////////////////////////////////////////////////

    var vm = new Mvvm({
        el: "#app",
        data: {
            msg: "1",
            date: new Date(),
            obj: {
                a: 1,
                b: 11
            }
        }
    })

    function update(){
        vm.msg = "updated";
    }

///////////////////////////////////////////////////////////////////////////////
</script>
</html>
```
# Vue生命周期
`Vue`实例需要经过创建、初始化数据、编译模板、挂载`DOM`、渲染、更新、渲染、卸载等一系列过程，这个过程就是`Vue`的生命周期，在`Vue`的整个生命周期中提供很多钩子函数在生命周期的不同时刻调用，`Vue`中提供的钩子函数有`beforeCreate`、`created`、`beforeMount`、`mounted`、`beforeUpdate`、`updated`、`beforeDestroy`、`destroyed`。

## 示例
在实例化`Vue`过程中，会直接触发的生命周期有`beforeCreate`、`created`、`beforeMount`、`mounted`，在数据更新的过程中触发的生命周期有`beforeUpdate`、`updated`，在销毁组件的过程中触发的生命周期有`beforeDestroy`、`destroyed`。

```html
<!DOCTYPE html>
<html>
<head>
    <title>Vue生命周期</title>
</head>
<body>
    <div id="app">
        <div>{{msg}}</div>
        <button @click="updateMsg">updateMsg</button>
        <button @click="destroyVue">destroyVue</button>
    </div>
</body>
<script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
<script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        data: {
            msg: 'Vue Lifecycle'
        },
        beforeCreate: function() {
            console.log("beforeCreate");
            console.log(this.$el); //undefined
            console.log(this.$data); //undefined 
            console.log(this.msg); // undefined
            console.log("--------------------");
        },
        created: function() {
            console.log("created");
            console.log(this.$el); //undefined
            console.log(this.$data); //{__ob__: Observer} 
            console.log(this.msg); // Vue Lifecycle
            console.log("--------------------");
        },
        beforeMount: function() {
            console.log("beforeMount");
            console.log(this.$el); //<div id="app">...</div>
            console.log(this.$data); // {__ob__: Observer}
            console.log(this.msg); // Vue Lifecycle
            console.log("--------------------");
        },
        mounted: function() {
            console.log("mounted");
            console.log(this.$el); //<div id="app">...</div>
            console.log(this.$data); //{__ob__: Observer} 
            console.log(this.msg); // Vue Lifecycle
            console.log("--------------------");
        },
        beforeUpdate: function () {
            console.log("beforeUpdate");
            console.log(this.$el);
            console.log(this.$data);
            console.log(this.msg);
            debugger;
            console.log("--------------------");
        },
        updated: function () {
            console.log("updated");
            console.log(this.$el);
            console.log(this.$data);
            console.log(this.msg);
            console.log("--------------------");
        },
        beforeDestroy: function () {
            console.log("beforeDestroy");
            console.log(this.$el);
            console.log(this.$data);
            console.log(this.msg);
            console.log("--------------------");
        },
        destroyed: function () {
            console.log("destroyed");
            console.log(this.$el);
            console.log(this.$data);
            console.log(this.msg);
            console.log("--------------------");
        },
        methods:{
            updateMsg: function(){
                this.msg = "Vue Update";
            },
            destroyVue: function(){
                this.$destroy();
            }
        }
    })
</script>
</html>
```

## beforeCreate
从`Vue`实例开始创建到`beforeCreate`钩子执行的过程中主要进行了一些初始化操作，例如组件的事件与生命周期钩子的初始化。在此生命周期钩子执行时组件并未挂载，`data`、`methods`等也并未绑定，此时主要可以用来加载一些与`Vue`数据无关的操作，例如展示一个`loading`等。

```javascript
console.log("beforeCreate");
console.log(this.$el); //undefined
console.log(this.$data); //undefined 
console.log(this.msg); // undefined
console.log("--------------------");
```

## created
从`beforeCreate`到`created`的过程中主要完成了数据绑定的配置、计算属性与方法的挂载、`watch/event`事件回调等。在此生命周期钩子执行时组件未挂载到到`DOM`，属性`$el`目前仍然为`undefined`，但此时已经可以开始操作`data`与`methods`等，只是页面还未渲染，在此阶段通常用来发起一个`XHR`请求。

```javascript
console.log("created");
console.log(this.$el); //undefined
console.log(this.$data); //{__ob__: Observer} 
console.log(this.msg); // Vue Lifecycle
console.log("--------------------");
```

## beforeMount
从`created`到`beforeMount`的过程中主要完成了页面模板的解析，在内存中将页面的数据与指令等进行解析，当页面解析完成，页面模板就存在于内存中。在此生命周期钩子执行时`$el`被创建，但是页面只是在内存中，并未作为`DOM`渲染。

```javascript
console.log("beforeMount");
console.log(this.$el); //<div id="app">...</div>
console.log(this.$data); // {__ob__: Observer}
console.log(this.msg); // Vue Lifecycle
console.log("--------------------");
```

## mounted
从`beforeMount`到`mounted`的过程中执行的是将页面从内存中渲染到`DOM`的操作。在此生命周期钩子执行时页面已经渲染完成，组件正式完成创建阶段的最后一个钩子，即将进入运行中阶段。此外关于渲染的页面模板的优先级，是`render`函数 `>` `template`属性 `>` 外部`HTML`。

```javascript
console.log("mounted");
console.log(this.$el); //<div id="app">...</div>
console.log(this.$data); //{__ob__: Observer} 
console.log(this.msg); // Vue Lifecycle
console.log("--------------------");
```

## beforeUpdate
当数据发生更新时`beforeUpdate`钩子便会被调用，此时`Vue`实例中数据已经是最新的，但是在页面中的数据还是旧的，在此时可以进一步地更改状态，这不会触发附加的重渲染过程。在上述例子中加入了`debugger`断点，可以观察到`Vue`实例中数据已经是最新的，但是在页面中的数据还是旧的。

```javascript
// this.msg = "Vue Update";
console.log("beforeUpdate");
console.log(this.$el); //<div id="app">...</div>
console.log(this.$data); //{__ob__: Observer} 
console.log(this.msg); // Vue Update
debugger;
console.log("--------------------");
```

## updated
当数据发生更新并在`DOM`渲染完成后`updated`钩子便会被调用，在此时组件的`DOM`已经更新，可以执行依赖于`DOM`的操作。

```javascript
// this.msg = "Vue Update";
console.log("updated");
console.log(this.$el); //<div id="app">...</div>
console.log(this.$data); //{__ob__: Observer} 
console.log(this.msg); // Vue Update
console.log("--------------------");
```

## beforeDestroy
在`Vue`实例被销毁之前`beforeDestroy`钩子便会被调用，在此时实例仍然完全可用。

```javascript
// this.$destroy();
console.log("beforeDestroy");
console.log(this.$el); //<div id="app">...</div>
console.log(this.$data); //{__ob__: Observer} 
console.log(this.msg); // Vue Update
console.log("--------------------");
```

## destroyed
在`Vue`实例被销毁之后`destroyed`钩子便会被调用，在此时`Vue`实例绑定的所有东西都会解除绑定，所有的事件监听器会被移除，所有的子实例也会被销毁，组件无法使用，`data`和`methods`也都不可使用，即使更改了实例的属性，页面的`DOM`也不会重新渲染。

```javascript
// this.$destroy();
console.log("destroyed");
console.log(this.$el); //<div id="app">...</div>
console.log(this.$data); //{__ob__: Observer} 
console.log(this.msg); // Vue Update
console.log("--------------------");
```
