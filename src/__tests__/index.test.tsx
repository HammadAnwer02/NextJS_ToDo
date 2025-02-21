import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import { signIn } from "next-auth/react";

// Mock the signIn function from NextAuth
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

// describe("LoginPage", () => {
//   it("renders the login page with a Sign in with Google button", () => {
//     render(<LoginPage />);
//     const button = screen.getByRole("button", { name: /sign in with google/i });
//     expect(button).toBeInTheDocument();
//   });

//   it("calls signIn with 'google' when the button is clicked", () => {
//     render(<LoginPage />);
//     const button = screen.getByRole("button", { name: /sign in with google/i });
//     fireEvent.click(button);
//     expect(signIn).toHaveBeenCalledWith("google");
//   });
// });
