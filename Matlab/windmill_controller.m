function breaking_force = windmill_controller(angular_vel, reference_vel)
% Controller parameters
P = 300;
B = 600;

% Default case
breaking_force = B * angular_vel; 

% Only apply additional breaking torque if above desired vel
if (angular_vel > reference_vel)
    breaking_force = B*angular_vel + P * (angular_vel - reference_vel);
end

end

