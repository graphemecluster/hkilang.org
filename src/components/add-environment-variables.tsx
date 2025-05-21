"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface AddEnvironmentVariablesProps {
	onSubmit: (variables: Record<string, string>) => void;
	requiredVariables: string[];
}

export default function AddEnvironmentVariables({ onSubmit, requiredVariables }: AddEnvironmentVariablesProps) {
	const [variables, setVariables] = useState<Record<string, string>>(
		requiredVariables.reduce((acc, key) => ({ ...acc, [key]: "" }), {}),
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleChange = (key: string, value: string) => {
		setVariables(prev => ({ ...prev, [key]: value }));
		setError(null);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validate all required variables are provided
		const missingVariables = requiredVariables.filter(key => !variables[key]);
		if (missingVariables.length > 0) {
			setError(`Please provide values for: ${missingVariables.join(", ")}`);
			return;
		}

		setIsSubmitting(true);
		setError(null);

		try {
			onSubmit(variables);
			setSuccess(true);
			setTimeout(() => setSuccess(false), 3000);
		}
		catch (err) {
			setError("Failed to set environment variables");
		}
		finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Environment Variables</CardTitle>
				<CardDescription>
					Add the required environment variables for the application to function properly.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{error && (
					<Alert variant="destructive" className="mb-4">
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				{success && (
					<Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
						<CheckCircle2 className="h-4 w-4" />
						<AlertDescription>Environment variables set successfully!</AlertDescription>
					</Alert>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					{requiredVariables.map(key => (
						<div key={key} className="space-y-2">
							<Label htmlFor={key}>{key}</Label>
							<Input
								id={key}
								type="text"
								value={variables[key]}
								onChange={e => handleChange(key, e.target.value)}
								placeholder={`Enter ${key}`} />
						</div>
					))}

					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? "Setting Variables..." : "Set Environment Variables"}
					</Button>
				</form>
			</CardContent>
			<CardFooter className="text-sm text-gray-500">
				These variables will be stored securely and used for API requests.
			</CardFooter>
		</Card>
	);
}
