% Simulation parameters
t_end = hr2sec(48); % End time of simulation
h = 1;              % Time step

% Wind turbine parameters
m = 5000 * 3;       % Mass (three rotor blades)
r = 30;             % Radius (length of blade)
A = r ^ 2 * pi;     % Area
J = m * r^2 / 3;    % Moment of inertia (approx. thin rod)
C = 0.04;           % Wind resistance coefficient
rho = 1.25;         % Air density
B1 = 1000;          % Friction coefficient for omega
B2 = 350;           % Friction coefficient for omega ^ 2

% Solar panel properties
sun_intensity = [3360 540 1140];
efficiency = 0.15;
num_panels = 50;
solar_E = 0;

% Generator properties
R = 0.25;           % Generator resistance
L = 0.01;           % Generator inductance
Ki = 1;             % Torque -> Current (???)
Ke = 1;             % Back-EMF coefficient (???)

% Initial conditions
base_wind = 10;
omega = 0;          % Angular velocity (of wind turbine)
theta = 0;          % Angular acceleration (of wind turbine)
u = 0;              % Voltage (Volts)
i = 0;              % Current (Amperes)
E = 0;              % Energy  (Watt seconds)

t = 0:h:t_end;
wind_velocity = wind(length(t), base_wind);

%cloudiness = cloud(length(t), 15);

omega_saved = zeros(length(t), 1);
solar_E_saved = zeros(length(t), 1);
E_saved = zeros(length(t), 1);

% Simulation loop
for n = 1:1:length(t)
    % Wind turbine
    friction = B1 * omega + B2 * omega ^ 2;
    wind_force = 0.5 * rho * C * A * wind_velocity(n)^2;
    wind_torque = wind_force * r/2;
    tau = wind_torque - friction;
    
    alpha = tau / J ;
    omega = euler_solve(omega, h, alpha);
    theta = euler_solve(theta, h, omega);
    
    % Generator
    i = tau / Ki;
    u = R*i + Ke*omega;
    P = u*i;
    E = euler_solve(E, h, P);
    
    % Solar panels
    time_block = mod(floor(n / (hr2sec(8)+1)), 3);
    current_intensity = sun_intensity(time_block+1);
    % TODO: Molnighet
    
    solar_P = current_intensity * num_panels * efficiency;
    solar_E = euler_solve(solar_E, h, solar_P);

    % Save data to plot
    omega_saved(n) = omega;
    E_saved(n) = E;
    solar_E_saved(n) = solar_E;
end
subplot(3,1,1);
plot(wind_velocity);
title('Windspeed');
subplot(3,1,2);
%figure('NumberTitle', 'off', 'Name', 'Angular velocity of the windmill')
plot(omega_saved ./ (2*pi), 'b');
title('Angular velocity of the windmill');
%xlim([hr2sec(8) hr2sec(9)])

%ylim([3 6])
subplot(3,1,3)
%figure('NumberTitle', 'off','Name', 'Power output of windmill in kWh')
plot(E_saved ./ (1000*60*60), 'r');
title('Power output of windmill in kWh');
%xlim([hr2sec(8) hr2sec(9)])


