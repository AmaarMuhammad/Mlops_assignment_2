db.createUser({
    user: "admin",
    pwd: "password",
    roles: [
      { role: "readWrite", db: "auth" },
      { role: "readWrite", db: "api" }
    ]
  });