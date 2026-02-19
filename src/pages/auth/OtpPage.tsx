import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowLeft, Shield, Building2, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/localstorage';
import { resetVerifyOTP, verifyOTP } from '@/store/slices/otpSlice';
import { showMessage } from '@/utils/Constant';

export const OtpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error, status }: any = useSelector((state: any) => state.otp);
    const { login } = useAuth();
    const [otpArray, setOtpArray] = useState(Array(6).fill(''));
    const [phoneNumber, setPhoneNumber] = useState('');
    const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [canResend, setCanResend] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);

    useEffect(() => {
        (async () => {
            const user_mobile: any = await getFromLocalStorage('user_mobile');
            if (!user_mobile) {
                navigate('/login');
                return;
            }
            setPhoneNumber(user_mobile);
        })();
    }, [navigate]);

    // Timer for resend OTP
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => {
                setResendTimer(resendTimer - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [resendTimer]);

    useEffect(() => {
        if (status === 'complete' && user?.result?.accessToken) {
            // Prepare user data for login
            const userData = {
                id: user.result.id || '',
                name: user.result.name || '',
                email: user.result.email || '',
                phone: phoneNumber,
                role: user.result.userRoles?.join(',') || '',
                avatar: user.result.avatar || ''
            };
            login(userData, user.result.accessToken);
            setToLocalStorage('userInfo', user.result);
            setToLocalStorage('auth_token', user.result.accessToken);
            dispatch(resetVerifyOTP());

            // Delay navigation to ensure context update propagates
            setTimeout(() => {
                const roles: string[] = user?.result?.userRoles || [];
                if (roles.includes('SuperAdmin')) {
                    navigate('/users');
                } else if (roles.includes('SubAdmin')) {
                    navigate('/users');
                } else if (roles.includes('LandAdmin')) {
                    navigate('/land-dashboard');
                } else if (roles.includes('KnowledgeAdmin')) {
                    navigate('/article-listing');
                } else if (roles.some(role =>
                    ['ProjectSalesManager', 'ProjectPreSales', 'ProjectSiteSales', 'CPManager', 'CPExecutive', 'FundManager', 'FundExecutive'].includes(role))) {
                    navigate('/crm-lead-list');
                } else if (roles.includes('VisitorAdmin')) {
                    navigate('/visitor-management');
                } else if (roles.includes('DynamicFormAdmin')) {
                    navigate('/form-list');
                } else if (roles.includes('CampaignAdmin')) {
                    navigate('/campaign-list');
                } else if (roles.includes('HRAdmin')) {
                    navigate('/job-seekers-list');
                } else if (roles.includes('FeedbackAdmin')) {
                    navigate('/feedback');
                }
                showMessage('Login successful');
            }, 0);
        } else if (status === 'failed') {
            showMessage(error || 'An error occurred', 'error');
        }
    }, [status, navigate, login, user, phoneNumber]);

    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && index > 0 && !otpArray[index]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        if (index !== 0) return;
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
        if (pastedData.length === 6) {
            const newOtpArray = pastedData.split('').slice(0, 6);
            setOtpArray(newOtpArray);
            inputRefs.current[5]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otp = otpArray.join("");

    if (otp !== "123456") {
        showMessage("Invalid OTP. Use 123456", "error");
        return;
    }

    // MOCK USER
    const mockUser = {
        id: "1",
        name: "Admin User",
        email: "admin@rcore.com",
        phone: phoneNumber,
        role: "SuperAdmin",
        avatar: ""
    };

    // Save mock auth
    localStorage.setItem("auth_token", "mock_token_123");
    localStorage.setItem("userInfo", JSON.stringify(mockUser));

    login(mockUser, "mock_token_123");

    showMessage("Login successful");

    navigate("/dashboard");
};


    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const otp = otpArray.join('');
    //     if (otp.length === 6) {
    //         dispatch(verifyOTP({ otp, phoneNumber, countryCode: '+91' }));
    //     } else {
    //         showMessage('Please enter a 6-digit OTP.', 'error');
    //     }
    // };

    const handleResendOTP = () => {
        if (canResend) {
            setResendTimer(30);
            setCanResend(false);
            setOtpArray(Array(6).fill(''));
            inputRefs.current[0]?.focus();
        }
    };

    const maskPhoneNumber = (phone: string) => {
        if (phone.length > 4) {
            return phone.slice(0, -4).replace(/\d/g, '•') + phone.slice(-4);
        }
        return phone;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}

                {/* OTP Card */}
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <div className="text-center mb-4 pt-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-xl mb-4">
                            <Building2 className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">R Core</h1>
                        <p className="text-gray-600">Real Estate Admin Dashboard</p>
                    </div>
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-semibold text-center text-gray-900">
                            Verify Your Identity
                        </CardTitle>
                        <CardDescription className="text-center text-gray-600">
                            We've sent a 6-digit verification code to
                        </CardDescription>
                        <p className="text-center font-medium text-gray-800">
                            {maskPhoneNumber(phoneNumber)}
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <Label className="text-sm font-medium text-gray-700 block text-center">
                                    Enter Verification Code
                                </Label>
                                <div className="flex justify-center gap-3">
                                    <InputOTP
                                        maxLength={6}
                                        value={otpArray.join('')}
                                        onChange={(value) => {
                                            const newOtpArray = value.split('');
                                            while (newOtpArray.length < 6) newOtpArray.push('');
                                            setOtpArray(newOtpArray.slice(0, 6));
                                        }}
                                    >
                                        <InputOTPGroup className="gap-3">
                                            {Array(6).fill(0).map((_, index) => (
                                                <InputOTPSlot
                                                    key={index}
                                                    index={index}
                                                    className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 focus:border-black transition-colors"
                                                    ref={(el) => (inputRefs.current[index] = el)}
                                                    onKeyDown={(e: any) => handleBackspace(e, index)}
                                                    onPaste={(e: any) => handlePaste(e, index)}
                                                />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                            </div>

                            {/* Timer */}
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>Resend available in {resendTimer}s</span>
                            </div>

                            {status === 'failed' && (
                                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                                    <p className="text-sm text-red-600 flex items-center gap-2">
                                        <Shield className="w-4 h-4" />
                                        {error}
                                    </p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium transition-colors"
                                disabled={status === 'loading' || otpArray.join('').length !== 6}
                            >
                                {status === 'loading' ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Verifying...
                                    </div>
                                ) : status === 'complete' ? (
                                    'Verified Successfully'
                                ) : (
                                    'Verify & Continue'
                                )}
                            </Button>
                        </form>

                        {/* Resend Section */}
                        <div className="mt-6 text-center space-y-3">
                            <p className="text-sm text-gray-600">Didn't receive the code?</p>
                            <Button
                                variant="outline"
                                onClick={handleResendOTP}
                                disabled={!canResend || status === 'loading'}
                                className="text-sm"
                            >
                                Resend Code
                            </Button>
                        </div>

                        {/* Back Button */}
                        <div className="mt-6 text-center">
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/login')}
                                className="text-sm text-gray-600 hover:text-gray-800"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to login
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Version Info */}
                <div className="text-center mt-6">
                    <p className="text-xs text-gray-400">
                        R Core Admin v1.0.0 • Real Estate Management System
                    </p>
                </div>
            </div>
        </div>
    );
};
