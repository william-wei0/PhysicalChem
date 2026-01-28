import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  EyeIcon,
  EyeOffIcon,
  CheckCircle2,
  CircleAlertIcon,
  TriangleAlertIcon,
} from "lucide-react";

import Navbar from "@/components/Navbar";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);

  const validatePassword = (password: string) => {
    let newPasswordError = "";

    if (password.length < 8) {
      newPasswordError += "• Password must be at least 8 characters long.\n";
    }
    if (!/[a-zA-Z]/.test(password)) {
      newPasswordError +=
        "• Password must contain at least one letter. (A-Z)\n";
    }

    if (!/[0-9]/.test(password)) {
      newPasswordError += "• Password must contain at least one digit. (0-9)\n";
    }

    setPasswordError(newPasswordError);
    if (newPasswordError) return false;

    return true;
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setFormError("Please fill in all fields.");
      return false;
    }

    if (!validatePassword(formData.password)) {
      setFormError("Password does not meet requirements.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setSuccess(false);

    if (!validateForm()) return;

    setSuccess(true);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") validatePassword(value);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full"
                />
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
                    {showPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
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
                    {showConfirmPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
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
                  <AlertDescription className="text-green-800">
                    Account created successfully!
                  </AlertDescription>
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
              <a
                href="login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
