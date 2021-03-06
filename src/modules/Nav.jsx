import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";

export function Nav({ isAuth, signOut, user }) {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          <img
            src="./logo-trans.png"
            alt="logo"
            width={60}
            height={52}
            className="d-inline-block align-text-top"
          />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link" to="/drills">
                Övningar
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/sessions">
                Träningspass
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/createNews">
                Skriv inlägg
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/about">
                Om
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/privacy">
                Privacy
              </Link>
            </li>

          </ul>
          <form class="d-flex">
            {isAuth ? (
              <div className="btn-group">
                {/* if user exsist and the user role == admin 
                  show Link to /admin */}
                {user && user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="btn btn-outline-primary my-2 my-sm-0"
                  >
                    Admin
                  </Link>
                )}

                <Link
                  class="btn btn-outline-success my-2 my-sm-0"
                  to={"/user/" + auth.currentUser.uid}
                >
                  {auth.currentUser.displayName}
                </Link>
                <button
                  class="btn btn-outline-danger my-2 my-sm-0"
                  onClick={signOut}
                >
                  Logga ut
                </button>
              </div>
            ) : (
              <Link class="btn btn-outline-success my-2 my-sm-0" to="/login">
                Logga in
              </Link>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}
