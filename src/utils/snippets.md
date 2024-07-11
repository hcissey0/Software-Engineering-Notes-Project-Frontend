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

