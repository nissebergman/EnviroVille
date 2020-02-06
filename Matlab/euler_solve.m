%%
% Calculates the approximate integral of a given function using the Euler
% approximation of derivatives.
%
% f: sampled function
% lb: lower bound of the integral
% ub: upper bound of the integral
% steps: amount of steps to calculate the integral ovee
function x = euler_solve(f)

ub = evalin('base', 'ub');
lb = evalin('base', 'lb');
steps = evalin('base', 'steps');

% Initialize solution to the same size as the input function
x = zeros(1, steps);

% Calculate step size
h = (ub - lb) ./ steps;

% Solve the integral
for n = 1:steps-1
    x(n+1) = x(n) + h * f(n);
end

end