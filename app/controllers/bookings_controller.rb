class BookingsController < ApplicationController
  def create
    @new_booking = Booking.new(strong_params)
    @new_booking.user = current_user
    @new_booking.cat = Cat.find(params[:cat_id])
    @new_booking.save!
    redirect_to root_path
  end

private

def strong_params
  params.require(:booking).permit(:start_date, :end_date)
end

end
