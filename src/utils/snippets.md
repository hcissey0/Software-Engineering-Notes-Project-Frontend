`Initial route setup`
```javascript
    <Routes>
            <Route
            path="/login"
            element={
                <PublicRoute>
                <Login />
                </PublicRoute>
            }
            action={loginAction}
            />

            <Route
            path="/signup"
            element={
                <PublicRoute>
                <Signup />
                </PublicRoute>
            }
            />

            <Route
            path="/"
            element={
                <PrivateRoute>
                <Layout>
                    <Home />
                </Layout>
                </PrivateRoute>
            }
            />

            <Route
            path="/edit"
            element={
                <PrivateRoute>
                <Layout>
                    <Edit />
                </Layout>
                </PrivateRoute>
            }
            />
    </Routes>

```

`Data passed to action handlers`
```javascript
    {request: Request, params: {…}, context: undefined}
```

`Initial login hander`
```javascript
        const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        const form = document.querySelector("form");
        const data = JSON.stringify(inputs);
        const response = await fetch("http://192.168.137.168:8000/api/token/", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
        });
        const resp_data = await response.json();
        console.log(resp_data);
        console.log(response.statusText, response.status);

        if (response.status === 200) {
        const access = resp_data.access;
        const refresh = resp_data.refresh;
        const user_details = {
            access: access,
            refresh: refresh,
        };
        localStorage.setItem("user_details", JSON.stringify(user_details));
        form.submit();
        return true;
        }
  };
    
```
`fixing dropdown behaviour`
```js
    const dropdown = document.getElementById('dropdown'); // Replace 'dropdown' with the actual id of your dropdown
    const dropdownRect = dropdown.getBoundingClientRect(); // get the bounding rectangle

    const viewportHeight = window.innerHeight; 
    const viewportWidth = window.innerWidth;

    const dropdownBottom = dropdownRect.top + dropdownRect.height;
    const isAtBottom = dropdownBottom >= viewportHeight;

    const dropdownRight = dropdownRect.left + dropdownRect.width;
    const isAtRightEdge = dropdownRight >= viewportWidth;
```

`parse query parameters`
```js
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
```

`using reloadDocument prop of link to force a reload`
```js
   <Link to='' reloadDocument>
```

`adjusting scrollbar`
To reduce the width of scrollbars in HTML, you can use the `scrollbar-width` CSS property. This property allows you to set the thickness of an element's scrollbars. Here are the possible values:

- `auto`: The default scrollbar width for the platform.
- `thin`: A thinner scrollbar width.
- `none`: No scrollbar shown, but the element will still be scrollable.

Here's an example of how to use it:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scrollbar Width Example</title>
  <style>
    .scrollbar-thin {
      width: 300px;
      height: 200px;
      overflow-y: scroll;
      scrollbar-width: thin; /* This sets the scrollbar to be thin */
    }
  </style>
</head>
<body>
  <div class="scrollbar-thin">
    <p>Content goes here...</p>
    <p>More content...</p>
    <p>Even more content...</p>
  </div>
</body>
</html>
```

For more customization, you can use the `::-webkit-scrollbar` pseudo-element, which provides more control over the appearance of scrollbars in WebKit-based browsers (like Chrome and Safari):

```css
/* Custom scrollbar for WebKit browsers */
.scrollbar-custom::-webkit-scrollbar {
  width: 8px; /* Width of the scrollbar */
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: darkgrey; /* Color of the scrollbar thumb */
  border-radius: 10px; /* Rounded corners */
}

.scrollbar-custom::-webkit-scrollbar-track {
  background: lightgrey; /* Color of the scrollbar track */
}
```

And apply it to your HTML:

```html
<div class="scrollbar-custom">
  <p>Content goes here...</p>
  <p>More content...</p>
  <p>Even more content...</p>
</div>
```

