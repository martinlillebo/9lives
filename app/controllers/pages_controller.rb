class PagesController < ApplicationController
before_action :authenticate_user!
  def dashboard
    @cats=Cat.all
    @user=current_user
    @bookings=Booking.all
  end

  def search
  end
end
# REFERENCE CATS AND UVIA USER ID
#  def @user.cats
#
