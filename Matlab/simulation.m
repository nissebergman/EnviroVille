% Simuilation parameters
t_end = hr2sec(24);   % End time of simulation
h = 1;              % Time step

% Wind turbine parameters
m = 5000 * 3;       % Mass (three rotor blades)
r = 36.5;           % Radius (length of blade)
A = r ^ 2 * pi;     % Area
J = m * r^2 / 3;    % Moment of inertia (approx. thin rod)
C = 0.04;           % Wind resistance coefficient
rho = 1.25;         % Air density
B = 0.4;             % Kinetic friction coefficient for steel (roughly)

% Generator properties
R = 0.25;           % Generator resistance
Ki = 1;             % Torque -> Current (???)
Ke = 1;             % Back-EMF coefficient (???)

% Initial conditions
wind_velocity = 10;
omega = 0;          % Angular velocity (of wind turbine)
theta = 0;          % Angular acceleration (of wind turbine)
u = 0;              % Voltage

t = 0:h:t_end;
omega_saved = zeros(length(t), 1);

% Simulation loop
for n = 0:1:length(t)
    % Wind turbine
    friction = B * omega;
    wind_torque = 0.5 * rho * C * A * wind_velocity^2;
    tau = wind_torque - friction;
    
    alpha = tau / J ;
    omega = euler_solve(omega, h, alpha);
    theta = euler_solve(theta, h, omega);
    
    % Generator
    U = R * tau / Ki + Ke * omega;
    
    % Save data to plot
    omega_saved(n+1) = omega;
end

plot(omega_saved, 'b');
