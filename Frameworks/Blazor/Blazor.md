# Blazor

* Blazor website [here](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor)
* Blazor can run client-side with webassembly or server-side. 
* When running Blazor Server (without webassembly), the communication between client/back is accomplished through SignalR. 
* When running Blazor Webassembly, only the .Net CLR is compiled to webassembly. The entire application you develop, is executed as standard .Net application executed by the CLR compiled to webassembly. 
* With Blazor, it's possible to create web applications with C#, HTML and CSS. Javascript interoperability is provided when necessary, but the main idea is to create web apps with C# instead of Javascript. 
* Almost all .Net standard nuget packages are compatible with Blazor. 
* Components and Pages are created with .razor file extension and can be shared and distributed as Razor class libraries or Nuget packages. 

## Components

* Blazor apps are built using *components*. A component is a self-contained chunk of user interface (UI), such as a page, dialog, or form. A component includes HTML markup and the processing logic required to inject data or respond to UI events
* Components are ordinary C# classes and can be placed anywhere within a project.
* You may use a Component as a Page that responds to a specific route. Just add `@page "/MyRoute"` on top of your Component and it will be accessible from the route you specify. 
* Component members can be used as part of the component's rendering logic using C# expressions that start with `@`
* Follow a sample Razor Component below:

```c#
<h1 style="font-style:@headingFontStyle">@headingText</h1>

@code {
    private string headingFontStyle = "italic";
    private string headingText = "Put on your new Blazor!";
}
```

* As you can see in the example above, we can set the css style from c# code. 
* It's possible to import components defined in others namespaces by typing `@using Your.Namespace` or you can use the fully qualified name. Ex: `<Your.Namespace.YourComponent />`
* It's possible to manually set the namespace of your component, by typing `@namespace BlazorSample.MyNamespace`
* We can split the html from c# using 2 files. Ex: 

```html
//Counter.razor
@page "/counter"
<h1>Counter</h1>
<p>Current count: @currentCount</p>
<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>
```

```c#
//Counter.razor.cs
namespace BlazorApp.Pages{
    public partial class Counter{
        private int currentCount = 0;
        void IncrementCount(){
            currentCount++;
        }
    }
}
```

* It's also possible to manually set the base class by typing `@inherits CounterBase`. This tells that the current razor file inherits the CounterBase class.

## Properties and Data Binding

* We can access any C# property inside Html by using `@`. Ex:

```html
@page "/BlazorRocks"
@inherits BlazorRocksBase
<h1>@BlazorRocksText</h1>
```

```c#
using Microsoft.AspNetCore.Components;
namespace BlazorSample{
    public class BlazorRocksBase : ComponentBase{
        public string BlazorRocksText { get; set; } = "Blazor rocks the browser!";
    }
}
```

* A simple data binding (from html to a c# property) can be done this way: 

```c#
<input @bind="CurrentValue" /> 

@code {
    private string CurrentValue { get; set; }//When the text box loses focus, the property's value is updated.
}
//The text box is updated in the UI only when the component is rendered, not in response to changing the property's value
```

* In principle, [`@bind`](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/razor?view=aspnetcore-3.1#bind) associates the current value of an expression with a `value` attribute and handles changes using the registered handler. More info [here](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/data-binding?view=aspnetcore-3.1)
* Use `@bind-{ATTRIBUTE}` with `@bind-{ATTRIBUTE}:event` syntax to bind element attributes other than `value`. In the following example, the paragraph's style is updated when the `paragraphStyle` value changes:

```c#
@page "/binding-example"

<p><input type="text" @bind="paragraphStyle" /></p>
<p @bind-style="paragraphStyle" @bind-style:event="onchange">Blazorify the app!</p>

@code {
    private string paragraphStyle = "color:red";
}
```

## Format String

* It's possible to format how a string is presented by using `@bind-format`. Ex:

```c#
<input @bind="StartDate" @bind:format="yyyy-MM-dd" />

@code {
    [Parameter]
    public DateTime StartDate { get; set; } = new DateTime(2020, 1, 1);
}
```



## Parameters

* Two way data-binding happens when we provide the <PropertyName>Changed event. Ex:

```c#
//MyComponent.razor
<h2>MyComponent</h2>
<p>Year: @Year</p>

@code {
    [Parameter] public int Year { get; set; }
    [Parameter] public EventCallback<int> YearChanged { get; set; }
}
```

* Using the example above, we can use the component above like this `<MyComponent @bind-Year="MyYear"></MyComponent>`

## Layouts

* Blazor allow the creation of Layouts that can be shared between several Pages. Follow a sample below:

```c#
//MyLayout.razor
@inherits LayoutComponentBase
    
<header><h1>Header content</h1></header>

@Body

<footer>@FooterContent</footer>

@code {
    public string FooterContent { get; set; } ="My footer content" ;
}
```

* The layout defined above can be used in any Page, like this:

```c#
@page "/layouts"
@layout MyLayout

<table class="table">
    <thead>
        <tr>
            <th>Name</th>
        </tr>
    </thead>
    <tbody>
        @foreach (var eUser in users) {
            <tr><td>@eUser.name</td></tr>
        }
    </tbody>
</table>
@code {
    List<EUser> users = new List<EUser>();
    protected override void OnInitialized() {
        base.OnInitialized();
        for(int i = 0; i < 10; i++) {
            users.Add(new EUser { name = "User" + i });
        }
    }
}
```

* You can create nested layouts by using `@inherits AnotherLayout` in your Layout file. More info [here](https://docs.microsoft.com/en-us/aspnet/core/blazor/layouts?view=aspnetcore-3.1)

## Forms

* Forms are created using `EditForm` component in Blazor.  
* A set of built-in input components are available to receive and validate user input. Ex: InputText, InputTextArea, ... 

Ex: 

```c#
//MyForm.razor
<EditForm Model="@exampleModel" OnValidSubmit="HandleValidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <InputText id="name" @bind-Value="exampleModel.Name" />
    <button type="submit">Submit</button>
</EditForm>

@code {
    private ExampleModel exampleModel = new ExampleModel();
    private void HandleValidSubmit(){
        Console.WriteLine("OnValidSubmit");
    }
}
```

```c#
//ExampleModel.cs
using System.ComponentModel.DataAnnotations;
public class ExampleModel{
    [Required]
    [StringLength(10, ErrorMessage = "Name is too long.")]
    public string Name { get; set; }
}
```

