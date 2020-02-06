function sampled = sample(func)

lb = evalin('base', 'lb');
ub = evalin('base', 'ub');
steps = evalin('base', 'steps');

t = linspace(lb, ub, steps);
sampled = func(t);

end