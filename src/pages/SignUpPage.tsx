import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { EyeIcon, EyeOffIcon, CheckCircle2, CircleAlertIcon, TriangleAlertIcon } from "lucide-react";

import Navbar from "@/components/Navbar";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateUsername = (username: string): string => {
    if (username.length < 3) return "Username must be at least 3 characters.";
    if (username.length > 30) return "Username must be under 30 characters.";
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Username can only contain letters, numbers, and underscores.";
    return "";
  };

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length > 254) return "Email address is too long.";
    if (!emailRegex.test(email)) return "Invalid email format.";
    return "";
  };

  const validatePassword = (password: string): string => {
    let errors = "";
    if (password.length < 8) errors += "• Must be at least 8 characters.\n";
    if (password.length > 72) errors += "• Must be under 72 characters.\n";
    if (!/[a-zA-Z]/.test(password)) errors += "• Must contain at least one letter. (A-Z)\n";
    if (!/[0-9]/.test(password)) errors += "• Must contain at least one digit. (0-9)\n";
    if (!/[^a-zA-Z0-9]/.test(password)) errors += "• Must contain at least one special character.\n";
    return errors;
  };

  const validateForm = () => {
    const usernameErr = validateUsername(formData.username.trim());
    const emailErr = validateEmail(formData.email.trim().toLowerCase());
    const passwordErr = validatePassword(formData.password);

    setUsernameError(usernameErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (usernameErr || emailErr || passwordErr) return false;

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setSuccess(false);

    if (!validateForm()) return;

    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error);
        return;
      }

      setSuccess(true);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch {
      setFormError("Something went wrong. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "username") setUsernameError(validateUsername(value.trim()));
    if (name === "email") setEmailError(validateEmail(value.trim().toLowerCase()));
    if (name === "password") setPasswordError(validatePassword(value));
    if (name === "confirmPassword") setFormError(value !== formData.password ? "Passwords do not match." : "");
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">Enter your details below to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Doe"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full"
                />
                {usernameError && <p className="text-sm text-red-500">{usernameError}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                />
                {emailError && <p className="text-sm text-red-500">{emailError}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {passwordError && (
                  <Alert className="border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400">
                    <CircleAlertIcon />
                    <AlertTitle>Your password is too weak</AlertTitle>
                    <AlertDescription className="whitespace-pre-line text-amber-600/80 dark:text-amber-400/80">
                      {passwordError}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </div>

              {formError && (
                <Alert variant="destructive" className="border-destructive">
                  <TriangleAlertIcon />
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">Account created successfully!</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
