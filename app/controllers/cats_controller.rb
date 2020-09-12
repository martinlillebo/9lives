class CatsController < ApplicationController
  before_action :authenticate_user!
  def index
    @cats = Cat.all
    @markers = @cats.geocoded.map do |flat|
      {
        lat: flat.latitude,
        lng: flat.longitude
      }
    end

     if params[:query].present?
      sql_query = " \
        cats.name ILIKE :query \
        OR cats.breed ILIKE :query \
        OR cats.gender ILIKE :query \
      "
      @cats = Cat.where(sql_query, query: "%#{params[:query]}%")
    else
      @movies = Cat.all
    end
  end

  def show
    @cat = Cat.find(params[:id])
    @booking = Booking.new

    @markers = [{lat: @cat.latitude, lng: @cat.longitude}]
  end

  def new
    @cat = Cat.new
  end

  def create
    @new_cat = Cat.create!(strong_params)
    if @new_cat.save
      redirect_to root_path(@cat)
    else
      render :new
    end
  end

  private

  def strong_params
    params.require(:cat).permit(:name, :gender, :breed, :hypoallergenic, :mood, :photo, :bio, :address) #returns a hash with the listed key/value pairs
  end
end
