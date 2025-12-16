import { Check, X } from "lucide-react";

// ----------------------------------------------------
// Password Rules + Strength Component
// ----------------------------------------------------
export function PasswordRules({ password, show }) {
  const rules = [
    { label: "At least 8 characters", isValid: password.length >= 8 },
    { label: "At least one uppercase letter (A-Z)", isValid: /[A-Z]/.test(password) },
    { label: "At least one lowercase letter (a-z)", isValid: /[a-z]/.test(password) },
    { label: "At least one number (0-9)", isValid: /[0-9]/.test(password) },
    { label: "At least one special character (!@#$%^&*)", isValid: /[!@#$%^&*(),.?":{}<>]/.test(password) },
  ];

  const validCount = rules.filter((r) => r.isValid).length;
  const strengthPercentage = (validCount / rules.length) * 100;

  const getStrengthText = () => {
    if (strengthPercentage <= 20) return "Very Weak";
    if (strengthPercentage <= 40) return "Weak";
    if (strengthPercentage <= 60) return "Fair";
    if (strengthPercentage <= 80) return "Good";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (strengthPercentage <= 20) return "bg-red-500";
    if (strengthPercentage <= 40) return "bg-orange-500";
    if (strengthPercentage <= 60) return "bg-yellow-500";
    if (strengthPercentage <= 80) return "bg-lime-500";
    return "bg-green-500";
  };

  if (!show) return null;

  return (
    <div className="mt-2 p-4 rounded-xl bg-gradient-to-br from-[#BAC095]/30 to-[#D4DE95]/20 border border-[#636B2F]/20">
      
      {/* Strength Bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium">Password Strength</span>
          <span className="text-xs font-semibold">{getStrengthText()}</span>
        </div>

        <div className="h-2 w-full bg-[#3D4127]/10 rounded-full overflow-hidden">
          <div
            className={`h-full ${getStrengthColor()}`}
            style={{ width: `${strengthPercentage}%` }}
          />
        </div>
      </div>

      {/* Rules */}
      <ul className="space-y-1.5">
        {rules.map((r, i) => (
          <li key={i} className="flex items-center gap-2 text-xs">
            {r.isValid ? (
              <Check className="w-3 h-3 text-green-600" />
            ) : (
              <X className="w-3 h-3 text-red-600" />
            )}
            <span className={r.isValid ? "line-through opacity-70" : ""}>
              {r.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ----------------------------------------------------
// Exported Validation Function (REQUIRED BY LoginCard)
// ----------------------------------------------------
// eslint-disable-next-line react-refresh/only-export-components
export function validatePassword(password) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*(),.?":{}<>]/.test(password)
  );
}
